
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen, take, map } from 'rxjs/operators';

import { AuthService, AuthTokenType } from '../auth/services/auth.service';
import { APP_CONFIG, IAppConfig } from '@app/core/config/app.config';
import { AlertService } from '../services/alert.servise';
import { BrowserStorageService } from '../auth/services/browser-storage.Service';
import { ValidationAuthTokenUser } from '../auth/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private delayBetweenRetriesMs = 1000;
    private numberOfRetries = 1;
    private authorizationHeader = 'Authorization';
    private acceptLanguage = 'Accept-Language';

    constructor(
        @Inject(APP_CONFIG) private appConfig: IAppConfig,
        private browserStorageService: BrowserStorageService,
        private validate: ValidationAuthTokenUser,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        private http: HttpClient
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const accessToken = this.validate.getRawAuthToken(AuthTokenType.AccessToken);
        if (!accessToken) {
            // login page
            return next.handle(request);
        }
        request = request.clone({
            headers: new HttpHeaders({
             //   'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(accessToken)}`,
                'Accept-Language': this.validate.getCurrentLanguge()
            })
        });



        return next.handle(request).pipe(
            catchError((error: any, caught: Observable<HttpEvent<any>>) => {
                if (error.status === 401) {
                    this.authService.logout();
                    return;
                }
                else if (error.status === 400) {
                    let errors = JSON.parse(error.error.message)
                    errors.forEach(element => {
                        this.alertService.error('', element['Description'])
                    });
                }
                else if (error.status === 403) {
                    this.router.navigate(['/forbidden']);
                }
                else if (error.status === 503) {
                    this.alertService.error('', 'در سرور خطایی رخ داده است  . دوباره تلاش کنید');
                    this.alertService.error('', 'در سرور خطایی رخ داده است  . دوباره تلاش کنید');
                } else if (error.status === 505) {
                    this.alertService.error('', 'در سرور خطایی رخ داده است  . دوباره تلاش کنید');
                }
                else if (error.status === 405) {
                    this.alertService.error('', 'در سرور خطایی رخ داده است  . دوباره تلاش کنید');
                }
                return throwError(error.error.message);
            })
        );
    }

    handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        const refreshTokenStatus = this.browserStorageService.getLocal('RefreshTokenStatus');
        if (refreshTokenStatus === true) {
            this.browserStorageService.setLocal('RefreshTokenStatus', false);
            this.authService.logout();
            return;
        }
        this.browserStorageService.setLocal('RefreshTokenStatus', true);

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const model = { refreshToken: this.validate.getRawAuthToken(AuthTokenType.RefreshToken) };
        const url = `${this.appConfig.apiEndpoint}/${this.appConfig.refreshTokenPath}`;

        return this.http
            .post(url, model, { headers: headers })
            .pipe(
                mergeMap((result) => {
                    this.browserStorageService.setLocal('RefreshTokenStatus', false);
                    this.validate.setLoginSession(result);
                    return this.hanldeRequest(request, next);
                })
            );
    }

    hanldeRequest(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const newRequest = this.getNewAuthRequest(request);
        if (newRequest) {
            return next.handle(newRequest);
        }
        this.router.navigate(['/login']);
    }

    getNewAuthRequest(request: HttpRequest<any>): HttpRequest<any> | null {
        const newStoredToken = this.validate.getRawAuthToken(AuthTokenType.AccessToken);
        const requestAccessTokenHeader = request.headers.get(this.authorizationHeader);
        if (!newStoredToken || !requestAccessTokenHeader) {
            return null;
        }
        const newAccessTokenHeader = `Bearer ${newStoredToken}`;

        if (requestAccessTokenHeader === newAccessTokenHeader) {
            return null;
        }
        return request.clone({ headers: request.headers.set(this.authorizationHeader, newAccessTokenHeader) });
    }
}
