import { IFileType } from '../interface/Ifile-type';
import { IAppConfig, APP_CONFIG } from '@app/core/config';
import { Inject } from '@angular/core';
import { FileTypeModel } from '../model/file-type-model';
import { TypeFile } from '@app/shared/models';
import * as config from '@app/core/config';

export class VideoType implements IFileType {

	constructor() {
	}

	FindFileType(): FileTypeModel {

		let model = {} as FileTypeModel;

		model.showCover = true;
		model.type = TypeFile.Video;
		model.allowWxtention = config.AppConfig.allowViedoExtentions;

		return model;

	}
}
