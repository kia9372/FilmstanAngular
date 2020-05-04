import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, Input, ɵConsole, AfterViewInit, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypeFile } from '@app/shared/models';
import { IAppConfig, APP_CONFIG } from '@app/core/config';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AlertService } from '@app/core/services';
import { PreviewComponent } from '@app/shared/components/preview/preview.component';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DeleteEntityDialogComponent } from '@app/views/partials/content/crud';
import { FileUpload } from '@app/shared/models/file-upload';
import { TableFilterRules } from '@app/core/models/table-filter';
import { TranslateService } from '@ngx-translate/core';
import { PostFileList } from '../../models/post-file-list';
import { FileTypeMethod } from '../../factory-pattern/method/file-type';
import { UploadLocalFileAddress } from '@app/shared/utility/address-local-file-upload';
import { FilePreview } from '@app/shared/utility/file-preview';

@Component({
	selector: 'kt-upload-file-manager',
	templateUrl: './upload-file-manager.component.html',
	styleUrls: ['./upload-file-manager.component.scss']
})
export class ListFileNewsComponent implements OnInit {

	private subscriptions = new Array<Subscription>();

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('upload') pRef: ElementRef;
	@ViewChild('progress', { static: false }) progress: ElementRef;

	@Input() private postId: number;
	@Input() private coverUrlShowFile: string;
	@Input() private IdName: string;
	@Input() private service: any;
	@Input() private apiControllerName: string;
	@Input() private justImage = false;
	@Input() private urlShowFile: string;
	@Input() private fileService: any;
	@Input() public postFileList: PostFileList[] = [];

	selected = '1';
	private coustomeModel : any;
	uploadFormGroup: FormGroup;
	fileType = TypeFile;
	loading: boolean;
	previewActive = true;
	uploadActive = true;
	display = 'none';
	queueProgress = 0;
	disabel = true;
	backGroundColor = '#0faa6e';
	uploadBtndisabel = true;
	fileUpload: FileUpload;
	isHidden = true;
	allowExtention: string[];
	coverExtentions: string[];
	filters: TableFilterRules[];
	lang = 'fa';
	pId: string;
	src: string[] = [];
	coverSrc: string[] = [];
	showLine = false;
	uploadPalceHolder: string;
	fileSource: string;
	isLoading: boolean;
	panelOpenState = false;
	firstInput = 0;

	constructor(
		@Inject(APP_CONFIG) private appConfig: IAppConfig
		, private formBuilder: FormBuilder
		, public dialog: MatDialog
		, private element: ElementRef
		, private localization: UploadLocalFileAddress
		, private preview: FilePreview
		, private alertService: AlertService
		, private translate: TranslateService
		, private cdRef: ChangeDetectorRef
	) {
		this.fileUpload = {} as FileUpload;
		this.filters = new Array<TableFilterRules>();
	}

	ngOnInit(): void {

		this.uploadFormGroup = this.formBuilder.group({
			fileItems: this.formBuilder.array([this.createItem()])
		});

		this.pId = this.postId.toString();
		this.getFiles(this.pId);

	}

	filePreview(type: TypeFile, id: number): void {
		this.preview.filePreview(this.urlShowFile, type, id);
	}

	coverPreview(type: TypeFile, id: number): void {
		this.preview.filePreview(this.coverUrlShowFile, 3, id);
	}

	showCoverPreview(index: number): void {
		this.preview.filePreview(this.coverSrc[index], this.fileType.Picture, null);
	}

	openDialog(index: number): void {
		const type = this.uploadFormGroup.get('fileItems').value[index]['typeEnum'];
		this.preview.filePreview(this.src[index], type, null);
	}

	showPreview(event: Event, index: number): void {

		this.localization.ConvertFileToAddress(event).then((data) => {
			this.src.push(data);
			const uploadBtn: any = document.getElementsByClassName('uploadGbtn')[index];
			console.log(uploadBtn)
			uploadBtn.disabled = false;
			this.cdRef.detectChanges();
		});

	}

	activeUploadForm(event: Event): void {
		this.localization.ConvertFileToAddress(event).then((data) => {
			this.coverSrc.push(data);
		});
		this.cdRef.detectChanges();
	}

	getFiles(postId: string): void {
		this.fileService.getPostFiles(1, 10, this.filters, postId).subscribe(data => {
			this.postFileList = data['records'];
			this.cdRef.detectChanges();
		});
	}

	createItem(): FormGroup {
		return this.formBuilder.group({
			postId: [''],
			typeEnum: [''],
			file: [''],
			title: [''],
			thumbnail: ['']
		});
	}

	openAccurdion(i: number): void {

		const acc = document.getElementsByClassName('accordion');

		for (i = 0; i < acc.length; i++) {

			acc[i].addEventListener('click', function () {
				this.classList.toggle('active');
				const panel = this.nextElementSibling;
				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = panel.scrollHeight + 'px';
				}
			});
		}
	}


	setExtention(fileEx, index: number): void {

		let uploadInput = document.getElementsByClassName('uploadFild')[index].getElementsByTagName('input')[0];
		const label = 'label' + index;
		const labelChange: any = document.getElementsByClassName(label);
		const placeHolder = 'ENUM.FILE_TYPE.' + fileEx;

		this.translate.get(placeHolder).subscribe(data => {
			labelChange[0].innerText = data;
		});

		const type = FileTypeMethod.typeFile(fileEx);
		uploadInput.accept = type.allowWxtention.toString();
		this.showHideCover(index, type.showCover);
		this.element.nativeElement.querySelectorAll('.uploadFild')[index]['disabled'] = false;
	}

	activeUpload(): void {
		this.uploadBtndisabel = false;
	}

	removeItem(index: number, unsubscribeWithIndex: boolean = true): void {
		console.log('in remove')
		const Item = <FormArray>this.uploadFormGroup.controls['fileItems'];
		Item.removeAt(index);
		this.showLineFunction(Item);
		if (unsubscribeWithIndex) {
			this.subscriptions[index].unsubscribe;
		}
		// this.subscriptions.forEach(element => {
		// 	if (element.closed) {
		// 		// tslint:disable-next-line: no-unused-expression
		// 		element.unsubscribe;
		// 	}
		// });
	}

	AddItem(): void {
		this.firstInput++;

		if (this.firstInput > 1) {

			const Item = <FormArray>this.uploadFormGroup.controls['fileItems'];
			Item.push(this.createItem());
			this.showLineFunction(Item);
			this.cdRef.detectChanges();
			if (this.justImage) {

				this.cdRef.detectChanges();
				this.setExtention('Picture', 0);
				this.cdRef.detectChanges();

			}
		} else if (this.justImage) {

			this.cdRef.detectChanges();
			this.setExtention('Picture', 0);
			this.cdRef.detectChanges();

		}
	}

	showLineFunction(form: FormArray): void {
		const lenght = form.length;
		if (lenght > 0) {
			this.showLine = true;
		} else {
			this.showLine = false;
		}
		this.cdRef.detectChanges();
	}

	showHideCover(index: number, showCover: boolean): void {

		let element = document.getElementsByClassName('uploadForms')[index].querySelector('.cover');
		let uploadInput = element.getElementsByTagName('input')[0];
		const hasClass = element.classList.contains('hideCover');

		if (hasClass) {
			if (showCover) {
				element.classList.remove('hideCover');
				uploadInput.accept = this.appConfig.allowImageExtentions.toString();
				element.classList.add('showCover');
			}
		} else {
			if (!showCover) {
				element.classList.remove('showCover');
				element.classList.add('hideCover');
			}
		}

	}

	Upload(index: number, postId: number): void {
		let uploadModel: any;

		const progressClassName = 'progressbar' + index;
		const btnClassName = 'ButtonProgress' + index;

		const uploadBtn: any = document.getElementsByClassName('uploadGbtn')[index];
		const btnProgress: any = document.getElementsByClassName(btnClassName);
		const progressLine: any = document.getElementsByClassName(progressClassName);


		progressLine[0].hidden = false;

		const selectedFiles = this.uploadFormGroup.get('fileItems').value;


		this.coustomeModel.type = this.uploadFormGroup.get('fileItems').value[index]['typeEnum'];
		this.coustomeModel.title = this.uploadFormGroup.get('fileItems').value[index]['title'];
		this.coustomeModel.files = selectedFiles[index]['file']['files'][0];
		this.coustomeModel[this.IdName.toString()] = postId;

		if (this.coustomeModel.type === TypeFile[2] || this.coustomeModel.type === TypeFile[1]) {
			if (selectedFiles[index]['thumbnail']['files'] !== undefined) {

				this.coustomeModel.thumbnail = selectedFiles[index]['thumbnail']['files'][0];

			} else {
				return this.alertService.error('', 'لطفا یک عکس انتخاب کنید');
			}
		}
		uploadModel = this.coustomeModel;
		uploadBtn.disabled = true;

		/******************************************************
			  Actions
		******************************************************/

		this.subscriptions.push(this.service
			.UplaodFile(uploadModel, this.apiControllerName)
			.subscribe(
				(event: HttpEvent<any>) => {
					switch (event.type) {
						case HttpEventType.UploadProgress:
							if (event.total) {
								this.queueProgress = Math.round(event.loaded / event.total * 100);
								// if (btnProgress[0].innerText !== undefined) {
								// 	btnProgress[0].innerText = this.queueProgress + ' % ';
								// }
								this.progress['_elementRef'].nativeElement.textContent = this.queueProgress + ' % '
								//	console.log(this.progress.nativeElement.textContent)
								//	this.progress.nativeElement.innerHTML=this.queueProgress + ' % '
								this.cdRef.detectChanges();
							}
							break;
						case HttpEventType.Response:
							if (event.body['success']) {
								this.queueProgress = null;
								this.alertService.success('', 'GENERAL.ADD_SUCCESS');
								this.removeItem(index, false);
								this.uploadBtndisabel = true;
								this.fileUpload.type = this.fileType.Text;
								this.previewActive = true;
								this.queueProgress = 0;
								this.uploadPalceHolder = undefined;
								this.uploadActive = true;
								this.postFileList.push(event.body['result']);
								this.cdRef.detectChanges();
							}
							this.loading = false;
							this.queueProgress = null;
							break;
					}
				},
				() => {
					this.loading = false;
					this.queueProgress = null;
				}
			));
	}

	delete(id: number): void {
		const title = 'Post Delete';
		const itemName = `Post `;
		const service = this.fileService;

		const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
			data: { id, title, itemName, service },
			width: '440px'
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.getFiles(this.pId);
				this.cdRef.detectChanges();
			}
		});
	}



}
