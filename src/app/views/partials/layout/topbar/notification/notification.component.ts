// Angular
import { Component, Input, OnInit, Inject, AfterViewInit, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as signalR from '@aspnet/signalr';
import { APP_CONFIG, IAppConfig } from '@app/core/config';
import { AuthService } from '@app/core/auth';
import { AuthTokenType } from '@app/core/auth/services/auth.service';
import { NotificationList } from './model/notification-list';
import { NodeFlags } from '@angular/compiler/src/core';
import { SignalRUtilite } from '@app/core/base/crud/utils/signalR-utilite';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignalRNotification } from './model/signalR-notification';
import { BehavorSubject } from '@app/core/services/behavior-subject';
import { HubConnection } from '@aspnet/signalr';
import { ValidationAuthTokenUser } from '@app/core/auth/services';

@Component({
	selector: 'kt-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['notification.component.scss'],
	host: {
		'(document:click)': 'onClick($event)',
	},
})
export class NotificationComponent implements OnInit, AfterViewInit {

	// Show dot on top of the icon
	@Input() dot: string;
	// Show pulse on icon
	@Input() pulse: boolean;
	@Input() pulseLight: boolean;
	// Set icon class name
	@Input() icon = 'flaticon2-bell-alarm-symbol';
	@Input() iconType: '' | 'success';
	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;
	// Set bg image path
	@Input() bgImage: string;
	// Set skin color, default to light
	@Input() skin: 'light' | 'dark' = 'light';
	@Input() type: 'brand' | 'success' = 'success';
	showNotificatin = false;
	page = 1;
	searchModel: any;
	listNotifications: NotificationList[] = [];
	notificationModel = {} as NotificationList;
	timeAdd = 0;
	notifCount = 0;
	private _hubConnection: HubConnection | undefined;
	closeDial = false;
	toggleButton = true;

	/**
	 * Component constructor
	 *
	 * @param sanitizer: DomSanitizer
	 */
	constructor(private _snackBar: MatSnackBar
		, private authService: ValidationAuthTokenUser
		, private _eref: ElementRef
		, private cdRef: ChangeDetectorRef
		, @Inject(APP_CONFIG) private appConfig: IAppConfig) {
		this.SignalRConnection();
	}

	ngOnInit(): void {
	//	this.getAllNotificarion();

	}

	ngAfterViewInit(): void {

	}
	onClick(event) {
		if (!this._eref.nativeElement.contains(event.target))
		{
			let element = document.getElementById('showNitification');
			console.log(element.style.display)
			if (element.style.display === 'block') {
				element.style.display = 'none';
			}
		}

	   }

	convrtStringToDate(date: string): string {
		let message = '';
		const olddate = new Date(date).getTime();
		const nowdate = new Date().getTime();
		const diff = nowdate - olddate;
		const seconds = Math.floor((diff / 1000) % 60);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		if (minutes < 1 && seconds < 0 || seconds === 0) {
			message = 'همین الان';
		}
		else if (hours < 1) {
			message = minutes + ' دقیقه ' + seconds + ' ثانیه پیش ';
		} else if (hours > 0) {
			message = hours + ' ساعت ' + minutes + ' دقیقه ' + seconds + ' ثانیه پیش ';
		}
		return message;
	}


	SignalRConnection(): void {
		this._hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(this.appConfig.signalREndPoint + '/notificationHub/?access_token=' + this.authService.getRawAuthToken(AuthTokenType.AccessToken))
			.build();
		this._hubConnection.start().then(function () {
			this.getAllNotificarion();
		}).catch(function (err) {
		});
		this._hubConnection.on('BroadcastMessage', (data) => {
			this.notificationModel = {} as NotificationList;
			this.notificationModel = JSON.parse(data);
			this.notifCount = this.notificationModel['TotalCount'];
			this.notificationModel.title = this.notificationModel['Records']['0']['Title'];
			this.notificationModel.createdOnUtc = this.notificationModel['Records']['0']['CreatedOnUtc'];
			this.listNotifications.push(this.notificationModel);
			this.cdRef.detectChanges();
			this.playAudio();
		});
	}

	playAudio(): void {
		const audio = new Audio();
		audio.src = 'assets/audio/alarm.mp3';
		audio.load();
		this.openSnackBar('شما یک اعلان جدید دارید', 'بستن');
		audio.play();
		this.cdRef.detectChanges();
	}

	getAllNotificarion(): void {
		const model = {} as any;
		model.hasSeen = false;
		model.page = this.page;
		model.pageSize = 4;
		// this.NotificationSERvice.getAll(model).subscribe(data => {
		// 	if (this.notifCount === 0) {
		// 		this.notifCount = data.totalCount;
		// 	}
		// 	this.listNotifications = data.records;
		// 	this.cdRef.detectChanges();
		// });
	}

	openSnackBar(message: string, action: string): void {
		this._snackBar.open(message, action, {
			duration: 2000,
		});
	}

	toggleFunction() {
		this.toggleButton = true;
		let element = document.getElementById('showNitification');
		if (element.style.display === '' || element.style.display === 'none') {
			element.style.display = 'block';
		} else if (element.style.display === 'block') {
			element.style.display = 'none';
		}
	}

	backGroundStyle(): string {
		if (!this.bgImage) {
			return 'none';
		}
		return 'url(' + this.bgImage + ')';
	}

	closeNotif(): void {
		// let select = document.getElementById('kt-header__topbar-item');
		// select.click()
	}


}
