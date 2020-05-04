import { FileTypeModel } from '../model/file-type-model';
import { TypeFile } from '@app/shared/models';
import { SoundType } from './sound-type';
import { Inject } from '@angular/core';

import { APP_CONFIG, IAppConfig } from '@app/core/config';
import { VideoType } from './video-type';
import { ImageType } from './image-type';
import { TextType } from './text-type';


export class FileTypeMethod {



	public static typeFile(type: string): FileTypeModel {
		switch (type) {
			case TypeFile[TypeFile.Sound]:
				return new SoundType().FindFileType();
			case TypeFile[TypeFile.Video]:
				return new VideoType().FindFileType();
			case TypeFile[TypeFile.Picture]:
				return new ImageType().FindFileType();
			case TypeFile[TypeFile.Text]:
				return new TextType().FindFileType();
			default:
				console.log('Error')
				break;
		}

	}
}
