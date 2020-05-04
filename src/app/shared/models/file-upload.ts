import { TypeFile } from '@app/shared/models/type-file-enum';

export interface FileUpload {
	postId: number;
	files: any;
	title: string;
	thumbnail: any;
	type: TypeFile;
}
