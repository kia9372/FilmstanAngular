import { TypeFile } from '@app/shared/models';

export interface FileTypeModel {
	type: TypeFile;
	allowWxtention: string[];
	showCover: boolean;
}
