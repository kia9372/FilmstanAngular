import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription, timer, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BrowserStorageService } from './browser-storage.Service';
import { Credentials } from '../models/credentials';
import { ToastrService } from 'ngx-toastr';
import { APP_CONFIG, IAppConfig } from '../../config/app.config';
import { isFunction } from 'util';
import { SendTokenValue } from '@app/shared/models/send-refreshToken-value';
import { ValidationAuthTokenUser } from './validate-auth-token';
import { LoginModel } from '../models/login-model';
import { AlertService } from '@app/core/services';
import { ServerResponse } from '@app/core/models';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient,
        private toastr: ToastrService,
        private authService: ValidationAuthTokenUser,
        private alertService: AlertService,
        private router: Router,
        private browserStorageService: BrowserStorageService,
        @Inject(APP_CONFIG) private appConfig: IAppConfig) { }


    // method for reftreshToken

    // Authentication/Authorization

    login(credentials: Credentials): Observable<boolean> {
        this.authService.deleteAuthTokens();
        return this.http
            .post<User>(this.appConfig.apiEndpoint + 'Login/Login', {
                username: credentials.username,
                password: credentials.password
            })
            .pipe(
                map((response: any) => {
                    if (response['isSuccess'] === false) {
                        this.toastr.error('', response['message']);
                        return false;
                    }
                    this.SetToken(response);
                    return true;
                })
            );
    }

    private SetToken(response: any) {
        this.authService.setLoginSession(response['data']);
        //  this.authService.scheduleRefreshToken();
        //     this.authService.authStatusSource.next(true);
        // set user permission in local storage
        this.getUserInformation().subscribe(response => {
            if (response['isSuccess'] === true) {
                this.browserStorageService.setUserInformation(response['data']['accessUnserInfos']);
                this.authService.setDisplayName(response['data']['dispayName']);
            }
        });
    }

    getUserInformation(): Observable<any> {
        return this.http.get(
            this.appConfig.apiEndpoint + 'User/UserInformation'
        );
    }

    logout(): void {
        let model = {} as SendTokenValue;
        //   model.value = this.browserStorageService.getLocal('RefreshToken');
        // this.logOut(model).subscribe(x => {
        // });
        this.authService.deleteAuthTokens();
        this.authService.authStatusSource.next(false);
        this.router.navigate(['/auth/login/']);
    }

    SendActivationCode(item): Observable<ServerResponse<any>> {
        return this.http.post<ServerResponse<any>>(this.appConfig.apiEndpoint + 'Login/SendActivationCode', item)
            .pipe(
                map(res => {
                    if (res.isSuccess) {
                        this.alertService.success('', res.message);
                        return res;
                    }
                    this.alertService.error('', res.message);
                    return res;
                })
            )
    }

    ChangePassword(item): Observable<ServerResponse<any>> {
        return this.http.post<ServerResponse<any>>(this.appConfig.apiEndpoint + 'User/ChangePasswordUser', item)
            .pipe(
                map(res => {
                    if (res.isSuccess) {
                        this.alertService.success('', res.message);
                        return res;
                    }
                    this.alertService.error('', res.message);
                    return res;
                })
            )
    }

    logOut(item: SendTokenValue): Observable<boolean> {
        localStorage.removeItem('displayName');
        return this.http.post<boolean>(this.appConfig.apiEndpoint + '/Account/Logout', item).pipe(
            map(res => {
                if (res) {
                    return res;
                }
            })
        );
    }

    sendConfirmCodeRequest(item): Observable<any> {
        return this.http.post<any>(this.appConfig.apiEndpoint + 'User/VerificationCode', item).pipe(
            map(res => {
                if (res['isSuccess']) {
                    this.router.navigate(['/auth/login'])
                } else {
                    this.alertService.error('', res['message']);
                }
            })
        );
    }
}

export enum AuthTokenType {
    AccessToken,
    RefreshToken
}
