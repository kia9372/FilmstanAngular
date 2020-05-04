import { HttpClient } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '@app/core/config';
import { ServerResponse } from '@app/core/models';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { AlertService } from '@app/core/services';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SettingManagerService<TModel> {

    constructor(
        public httpClient: HttpClient
        , private alertService: AlertService
        , @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

    public GetSetting(url: string): Observable<ServerResponse<TModel>> {
        return this.httpClient.get<ServerResponse<TModel>>(this.appConfig.apiEndpoint + `${url}`);
    }
        public SetSetting(item:TModel,url: string): Observable<ServerResponse<TModel>> {
        return this.httpClient.put<ServerResponse<TModel>>(this.appConfig.apiEndpoint + `${url}`,item)
        .pipe(
            map(data=>{
                if(data.isSuccess)
                {
                    this.alertService.success('',data.message);
                    return data;
                }
                this.alertService.error('',data.message);
                return null;
            })
        )
    }
}
