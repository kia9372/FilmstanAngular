import { Directive, ElementRef, OnInit } from '@angular/core';
import { BrowserStorageService, ValidationAuthTokenUser } from '../services';
import { AuthService } from '../services/auth.service';

@Directive({
	selector: '[uaccess]',
	inputs: ['permission']
})
export class PermissionDirective implements OnInit {
	_dval = 'green';
	permission: string;

	constructor(
		private _ref: ElementRef,
		private authServise: ValidationAuthTokenUser
	) {}

	ngOnInit(): void {
		if (!this.authServise.isAuthUserInRole(this.permission)) {
			this._ref.nativeElement.style.display = 'none';
		}
	}
}
