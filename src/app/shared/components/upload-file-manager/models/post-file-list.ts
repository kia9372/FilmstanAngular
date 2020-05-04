import { TypeFile } from '@app/shared/models';

export class PostFileList {
	contentType: string;
	createdByRefId: number;
	createdDateTimePersian: string;
	createdOnUtc: string;
	createdUserFullName: string;
	extension: string;
	fileName: string;
	id: number;
	isAttachmentFile: boolean;
	postId: number;
	size: number;
	type: TypeFile;
}