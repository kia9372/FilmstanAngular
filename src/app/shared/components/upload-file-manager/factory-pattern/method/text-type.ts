import { IFileType } from '../interface/Ifile-type';
import { Inject } from '@angular/core';
import * as config from '@app/core/config';
import { FileTypeModel } from '../model/file-type-model';
import { TypeFile } from '@app/shared/models';

export class TextType implements IFileType {

	constructor() {
	}

	FindFileType(): FileTypeModel {

		let model = {} as FileTypeModel;

		model.showCover = false;
		model.type = TypeFile.Text;
		model.allowWxtention = config.AppConfig.allowTextExtentions;

		return model;

	}
}