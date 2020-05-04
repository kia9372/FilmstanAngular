// Angular
import { Component, Inject } from '@angular/core';
import { AuthService } from '@app/core/auth';
import { BrowserStorageService } from '@app/core/auth/services';
import { Observable } from 'rxjs/internal/Observable';
import { APP_CONFIG, IAppConfig } from '@app/core/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehavorSubject } from '@app/core/services/behavior-subject';
export interface UserModel {
	id: number;
	hasAvatar: boolean;
}
@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {

	displayName: string;
	firstLetterName: string;
	user: UserModel;
	userId: number;
	hasAvatar: boolean;
	Url = 'User/GetAvatar';

	constructor(
		private authService: AuthService,
		@Inject(APP_CONFIG) private appConfig: IAppConfig,
		private closeDialog: BehavorSubject,
		private broserStoreage: BrowserStorageService,
		private http: HttpClient
	) {
		this.displayName = this.broserStoreage.getLocal('displayName');
		// this.getUserInformation().subscribe(x => {
		// 	this.userId = x['result']['id'];
		// 	this.hasAvatar = x['result']['hasAvatar'];
		// });
	}

	getUserInformation(): Observable<any> {
		return this.http.get(
			this.appConfig.apiEndpoint + '/UsersManager/UserInformation'
		);
	}

	closeDialogs(): void {
		this.closeDialog.booleanValue$.subscribe(x => {
		});
	}

	logout(): void {
		this.authService.logout();
	}
}
