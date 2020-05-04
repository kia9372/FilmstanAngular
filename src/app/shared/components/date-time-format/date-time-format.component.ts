import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'jalali-moment';
import { TranslationService } from '@app/core/services';

@Component({
	selector: 'kt-date-time-format',
	templateUrl: './date-time-format.component.html',
	styleUrls: ['./date-time-format.component.scss']
})
export class DateTimeFormatComponent implements OnInit {

	@Input() date: string;
	@Input() differ: boolean = false;
	@Input() row = false;

	constructor(private langulageService: TranslationService) {

	}

	ngOnInit(): void {

		if (this.date === '0001-01-01T00:00:00+00:00') {
			this.date = null;
		}
	}

	findLanguage(date: string): string {
		let time: string;
		this.langulageService.currentLang$.subscribe(lang => {
			time = moment(date).locale(lang).format('YYYY/MM/DD');
		});
		return time;
	}

}
