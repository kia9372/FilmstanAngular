import { Component, OnInit, Input, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '@app/core/config';
import { AuthService } from '@app/core/auth';
import { AuthTokenType } from '@app/core/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from '../preview/preview.component';
import { TypeFile } from '@app/shared/models';
import { ValidationAuthTokenUser } from '@app/core/auth/services';

@Component({
	selector: 'kt-show-image-in-list',
	templateUrl: './show-image-in-list.component.html',
	styleUrls: ['./show-image-in-list.component.scss']
})
export class ShowImageInListComponent implements OnInit {

	@Input() Url: string;
	@Input() postId: number;
	@Input() hasAvatar: boolean = true;
	@Input() NoClick = false;

	ImageUrl: string;

	constructor(
		@Inject(APP_CONFIG) private appConfig: IAppConfig,
		private authService: ValidationAuthTokenUser
		, private dialog: MatDialog
	) { }

	ngOnInit(): void {
		if (this.hasAvatar) {
			this.ImageUrl = this.appConfig.apiEndpoint + '/' + this.Url + this.postId + '/?access_token=' + this.authService.getRawAuthToken(AuthTokenType.AccessToken);
		} else {
			this.ImageUrl = '/assets/Images/default.png';
		}
	}

	openPreviewDialog(): void {
		if(!this.NoClick)
		{
			this.dialog.open(PreviewComponent, {
				data: {
					src: this.Url + this.postId,
					type: TypeFile.Picture
				},
				disableClose: true
			});
		}
	}
}
