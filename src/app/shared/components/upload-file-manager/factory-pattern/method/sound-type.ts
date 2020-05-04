import { IFileType } from '../interface/Ifile-type';
import { Inject } from '@angular/core';
import { FileTypeModel } from '../model/file-type-model';
import * as config from '@app/core/config';
import { TypeFile } from '@app/shared/models';

export class SoundType implements IFileType {

	constructor() {}

	FindFileType(): FileTypeModel {
		let model = {} as FileTypeModel;
		model.showCover = true;
		model.type = TypeFile.Sound;
		model.allowWxtention = config.AppConfig.allowAudioExtentions;
		return model;
	}
}
