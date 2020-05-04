import { GenericServicService } from '@app/core/services/generic-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServerResponse } from '@app/core/models';

@Injectable({
    providedIn: 'root'
})

export class UserManagerService extends GenericServicService<any, any, any, any>{

    ChangeUserActivationSdtatus(id): Observable<ServerResponse<any>> {
        return this.httpClient.put<ServerResponse<any>>(this.appConfig.apiEndpoint + 'User/ChangeUserActiveStatus', { id: id }).pipe(
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

    ChangeUserEmailSdtatus(id): Observable<ServerResponse<any>> {
        return this.httpClient.put<ServerResponse<any>>(this.appConfig.apiEndpoint + 'User/ChangeUserEmailStatus', { id: id }).pipe(
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

    ChangeUserLockEndSdtatus(id): Observable<ServerResponse<any>> {
        return this.httpClient.put<ServerResponse<any>>(this.appConfig.apiEndpoint + 'User/ChangeUserIsLockedEndStatus', { id: id }).pipe(
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

    ChangeUserPhoneNumberSdtatus(id): Observable<ServerResponse<any>> {
        return this.httpClient.put<ServerResponse<any>>(this.appConfig.apiEndpoint + 'User/ChangeUserPhoneConfirmedStatus', { id: id }).pipe(
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

    GetCurrentUserRoleId(id: string): Observable<any> {
        return this.httpClient.get<any>(this.appConfig.apiEndpoint + `User/GetUserCurrentUserRole/${id}`);
    }

    ChangePhoneNumber(item): Observable<any> {
        return this.httpClient.put<any>(this.appConfig.apiEndpoint + 'User/ChangePhoneNumber', item).pipe(
            map(res => {
                if (res.isSuccess) {
                    this.alertService.success('', res['message']);
                    return res;
                }
                this.alertService.error('', res['message']);
                return res;
            })
        )
    }

    ChangePasswordUser(item): Observable<any> {
        return this.httpClient.put<any>(this.appConfig.apiEndpoint + 'User/ChangePasswordUser', item).pipe(
            map(res => {
                if (res.isSuccess) {
                    this.alertService.success('', res['message']);
                    return res;
                }
                this.alertService.error('', res['message']);
                return res;
            })
        )
    }

    ChangeUserRole(item): Observable<any> {
        return this.httpClient.put<any>(this.appConfig.apiEndpoint + 'User/ChangeUserRole', item).pipe(
            map(res => {
                if (res.isSuccess) {
                    this.alertService.success('', res['message']);
                    return res;
                }
                this.alertService.error('', res['message']);
                return res;
            })
        )
    }


}
