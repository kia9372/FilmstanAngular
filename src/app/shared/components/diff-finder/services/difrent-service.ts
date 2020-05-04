import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '@app/core/config';
import { DeiffrentModel } from '../models/diffrent-model';

@Injectable({
    providedIn: 'root'
})
export class DiffrentService {


    constructor(
        @Inject(APP_CONFIG) private appConfig: IAppConfig,
        private http: HttpClient) { }

    getById(id: number): Observable<DeiffrentModel> {
        return this.http.get<DeiffrentModel>(this.appConfig.apiEndpoint + '/AuditLog/' + id);
    }

}