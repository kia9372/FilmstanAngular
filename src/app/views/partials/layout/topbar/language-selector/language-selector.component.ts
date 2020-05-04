// Angular
import {
	Component,
	HostBinding,
	OnInit,
	Input,
	ElementRef
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
// RxJS
import { filter } from 'rxjs/operators';
// Translate
import { TranslationService } from '../../../../../core/base/layout';
import { LanguageFlag } from '@app/core/services';

@Component({
	selector: 'kt-language-selector',
	templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent implements OnInit {
	// Public properties
	@HostBinding('class') classes = '';
	@Input() iconType: '' | 'brand';

	language: LanguageFlag;
	languages: LanguageFlag[];
	showDropDown: Boolean = true;

	/**
     * Component constructor
     *
     * @param translationService: TranslationService
     * @param router: Router
     */
	constructor(
		private translationService: TranslationService,
		private router: Router,
		private _eref: ElementRef
	) {
		this.languages = this.translationService.languages;
	}

	/**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

	/**
     * On init
     */
	ngOnInit() {
		this.setSelectedLanguage();
		this.router.events
			.pipe(filter(event => event instanceof NavigationStart))
			.subscribe(event => {
				this.setSelectedLanguage();
			});
	}

	/**
     * Set language
     *
     * @param lang: any
     */
	setLanguage(lang) {
		this.showDropDown = false;
		this.languages.forEach((language: LanguageFlag) => {
			if (language.lang === lang) {
				language.active = true;
				this.language = language;
			} else {
				language.active = false;
			}
		});
		this.translationService.setLanguage(lang);
		this.translationService.setDirectionStyle(this.language.dir);
		setTimeout(() => {
			this.showDropDown = true;
		}, 10);
	}

	/**
     * Set selected language
     */
	setSelectedLanguage(): any {
		this.setLanguage(this.translationService.getSelectedLanguage());
	}
}
