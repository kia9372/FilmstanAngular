// import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AlertService } from '../services/alert.servise';
import { AuthService } from '../auth';

@Injectable()
export class HttpInterceptorServise implements HttpInterceptor {
	constructor(private alertService: AlertService, private authService: AuthService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			map(res => {
				if (res['body']) {
					if (res['body']['success'] !== undefined) {
						if (res['body']['success'] === false) {
							this.alertService.error('', res['body']['message']);
						}
					}
				}
				return res;
			}),
			catchError((error: HttpErrorResponse) => {
				let errorMessage = '';
				if (error.status === 401){
						// this.authService.logout();
				}
				else if (error.error instanceof ErrorEvent) {
					// client-side error
					errorMessage = `Error: ${error.error.message}`;
				} else {
					// server-side error
					errorMessage = `Error Code: ${error.status}\nMessage: ${
						error.message
					}`;
				}
				console.log(errorMessage);
				this.alertService.error('', 'GENERAL.ERROR: ' + error.status);
				return throwError(error);
			})
		);
	}
}
