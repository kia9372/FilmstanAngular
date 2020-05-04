import { Component, OnInit, Inject, Output, EventEmitter, HostListener, OnDestroy, ViewEncapsulation, ɵConsole } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { TypeFile } from '@app/shared/models';
import { APP_CONFIG, IAppConfig } from '@app/core/config';
import { AuthService } from '@app/core/auth';
import { AuthTokenType } from '@app/core/auth/services/auth.service';
import { AlertService } from '@app/core/services';
import { ValidationAuthTokenUser } from '@app/core/auth/services';

export interface DialogData {
	src: string;
	type: TypeFile;
	isLocal: boolean;
	apiControllName: string;
}

declare const require: any;

@Component({
	selector: 'kt-preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {

	@Output() showButton = new EventEmitter<boolean>();

	subscriptions: Subscription;
	thumbnail: any;
	fileSource: any;
	Video = 'Video';
	Picture = 'Picture';
	Text = 'Text';
	Sound = 'Sound';
	type: any;
	isLoading: boolean;
	showVid: any;
	fileType = TypeFile;
	url: string;
	AdressFile: string;
	show = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DialogData
		, @Inject(APP_CONFIG) private appConfig: IAppConfig
		, private dialogRef: MatDialogRef<PreviewComponent>
		, private alertService: AlertService
		, private authService: ValidationAuthTokenUser
		, private sanitizer: DomSanitizer) {
		this.ValidateFile();
	}

	@HostListener('window:keyup.esc') onKeyUp(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {
		this.type = this.data.type;
		this.AdressFile = this.url;
		if (this.data.type.toString() === 'Text') {
			window.open(this.data.src);
			this.dialogRef.close();
		}
	}

	ngOnDestroy(): void {
		if (this.subscriptions) {
			this.subscriptions.unsubscribe();
		}
	}

	ValidateFile(): void {
		// function
		if (this.data.src === undefined) {
			this.alertService.warning('', 'عکسی برای نمایش وجود ندارد');
			this.show = false;
		} else {
			if (this.data.src.includes('base64')) {
				if (this.data.src.includes(this.appConfig.localImage)) {
					this.data.type = TypeFile.Picture;
				}
				else if (this.data.src.includes(this.appConfig.localVideo)) {
					this.data.type = TypeFile.Video;
				}
				else if (this.data.src.includes(this.appConfig.localText)) {
					this.data.type = TypeFile.Text;
				}
				else if (this.data.src.includes(this.appConfig.localAudio)) {
					this.data.type = TypeFile.Sound;
				}

				this.data.src = this.data.src;

			} else {

				this.data.src = this.appConfig.apiEndpoint + '/' + this.data.src + '/?access_token=' + this.authService.getRawAuthToken(AuthTokenType.AccessToken);

			}
		}
	}

	close(): void {
		this.dialogRef.close();
	}
}
