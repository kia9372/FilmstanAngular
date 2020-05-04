import { IFileType } from '../interface/Ifile-type';
import { FileTypeModel } from '../model/file-type-model';
import { TypeFile } from '@app/shared/models';
import * as config from '@app/core/config';


export class ImageType implements IFileType {


	imageType: number;

	constructor() {
	}

	FindFileType(): FileTypeModel {
		let model = {} as FileTypeModel;
		model.showCover = false;
		model.type = TypeFile.Picture;
		model.allowWxtention = config.AppConfig.allowImageExtentions;
		return model;
	}
}