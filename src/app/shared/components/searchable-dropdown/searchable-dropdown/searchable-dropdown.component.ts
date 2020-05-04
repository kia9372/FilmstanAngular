import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, forwardRef, HostListener, DoCheck, ViewChild } from '@angular/core';
import { SearchableDropDownService } from '../services/searchable-dropdown-service';
import { SendDateModel } from '../models/send-data-model';
import { FormControl, FormGroup, AbstractControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatSelect } from '@angular/material/select';


export interface KeyValue {
	key: number;
	value: string;
}

@Component({
	selector: 'kt-searchable-dropdown',
	templateUrl: './searchable-dropdown.component.html',
	styleUrls: ['./searchable-dropdown.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SearchableDropdownComponent),
			multi: true
		}
	]
})

export class SearchableDropdownComponent implements OnInit, DoCheck {

	@ViewChild('matSelect', { static: false }) public metSelect: MatSelect;
	@Input() url: string;
	@Input() formcontrolName: string;
	@Input() formGroup: FormGroup;
	@Input() ItemId: number;
	@Input() disabled: boolean;
	@Input() showStar = false;
	@Input() kolanNotall=true;
	@Input() showAll = true;
	@Input() cValues: KeyValue[];
	@Input() placeHolder = "GENERAL.ALL";
	@Input() secondId: number;
	@Output() selectedId = new EventEmitter<number>();
	@Input() formTitle: string;
	@Input() byGet = false;
	@Input() validation = true;

	showError = false;
	loading = false;
	touched = false;
	isLessonsLoading = false;
	selectedOption = "all";
	searchText: string;
	val = '';
	FG: FormGroup;
	values: KeyValue[];
	title: string;

	constructor(
		private searchService: SearchableDropDownService,
		private cdRef: ChangeDetectorRef
	) { }

	/********************************************
	  Life Cycle
   *******************************************/

	ngOnInit(): void {
		if (this.ItemId > 0) {
			this.selectedOption = this.ItemId.toString();
		}
		if (this.cValues !== undefined) {
			this.isLessonsLoading = true;
			this.values = this.cValues;
			this.isLessonsLoading = false;
			this.ItemId = this.ItemId;
		} else { }
		this.getValues(null);
	}


	toogle(event): void {
		this.metSelect.close();
		if (event) {
			if (this.showAll===false) {
				this.kolanNotall = false;
			}
		} else {
			if (this.showAll) {
				this.kolanNotall = true;
			}
		}
	}

	/********************************************
		Custome Form Validation
   *******************************************/

	onChanged(): void {
		if (this.formcontrolName !== undefined) {
			this.cdRef.detectChanges();
			const controlState = this.formGroup.controls[this.formcontrolName];
			controlState.markAllAsTouched();
			this.cdRef.detectChanges();
		}
	}

	ngDoCheck(): void {
		this.cdRef.detectChanges();

		if (this.cValues !== undefined) {
			this.values = this.cValues;
			this.loading = false;
			this.ItemId = this.ItemId;
		}

		if (this.formcontrolName !== undefined) {
			const controlState = this.formGroup.controls[this.formcontrolName];
			const value = this.formGroup.controls[this.formcontrolName].value;

			if (controlState.touched) {

				if (value === '') {
					this.showError = true;
				} else {
					this.showError = false;
				}

			}
		}

		this.cdRef.detectChanges();
	}
	/********************************************
	Public
   *******************************************/

	emitdata(event): void {
		this.selectedId.emit(event);
	}

	compareCategoryObjects(object1: any, object2: any): boolean {
		return object1 && object2 && object1.toString() === object2.toString();
	}

	/********************************************
   Fetch Data
  *******************************************/

	getValues(event): void {

		this.cdRef.detectChanges();
		this.loading = true;

		let model = {} as SendDateModel;
		model.page = 1;
		model.pageSize = 60;
		model.title = event;

		if (this.url !== undefined) {
			if (this.secondId !== undefined) {
				this.url = this.url + '/' + this.secondId;
			}
			if (this.byGet === false) {
				this.searchService.getAll(this.url, model).subscribe(data => {
					this.isLessonsLoading = true;
					this.values = data['result']['records'];
					this.cdRef.detectChanges();
					this.loading = false;
					this.isLessonsLoading = false;
				});
			} else {
				this.searchService.GetAll(this.url, model).subscribe(data => {
					this.isLessonsLoading = true;
					this.values = data['result']['records'];
					this.cdRef.detectChanges();
					this.loading = false;
					this.isLessonsLoading = false;
				});
			}

		}
	}
}
