import { PreviewComponent } from '../components/preview/preview.component';
import { TypeFile } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { AlertService } from '@app/core/services';

@Injectable({
	providedIn: 'root'
})
export class FilePreview {

	constructor(private dialog: MatDialog, private alertService: AlertService) { }

	filePreview(name: string, type: TypeFile, id: number, hasAavate?: boolean): void {
		let src: string;
		if (name === undefined || hasAavate === false) {
			this.alertService.warning('', 'عکسی برای نمایش وجود ندارد');
		} else {
			if (!name.includes('base64')) {
				src = name + id;
			}
			else if (name !== null) {
				src = name;
			}
			this.dialog.open(PreviewComponent, {
				data: {
					src: src,
					type: type
				},
				disableClose: true
			});
		}
	}

}
