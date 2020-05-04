import { IFileType } from '../interface/Ifile-type';
import { FileTypeModel } from './file-type-model';
import { TypeFile } from '@app/shared/models';

export class FileType implements IFileType {

	fileExtentions: number;

	constructor(private fileType: number) {
		this.fileExtentions = fileType;
	}

	FindFileType(): FileTypeModel {
		throw new Error("Method not implemented.");
	}

}