import { HttpHeaders, HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TableFilter } from '../models/table-filter';
import { TablePagingIndex, ServerResponse } from '../models';
import { APP_CONFIG, IAppConfig } from '../config';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.servise';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
    providedIn: 'root'
})
export class GenericServicService<TAddModel, TEditModel, TGetAllModel, TGetItem> {
    private headers: HttpHeaders;

    private filterSource = new Subject<string>();
    public filter$ = this.filterSource.asObservable();

    constructor(public httpClient: HttpClient, public alertService: AlertService, @Inject(APP_CONFIG) public appConfig: IAppConfig) { }

    // Create a Geberic Service with Generic Model for Create Object in Database
    public Create(item: TAddModel, url: string): Observable<ServerResponse<TAddModel>> {
        return this.httpClient.post<ServerResponse<TAddModel>>(this.appConfig.apiEndpoint + `${url}`, item)
            .pipe(
                map(res => {
                    if (res.isSuccess) {
                        this.alertService.success('', res.message);
                        return res;
                    }
                })
            )
    }

    CreateWithFile(item: any, url: string): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint + url}`;
        const formData: FormData = new FormData();
        for (const key in item) {
            if (item.hasOwnProperty(key)) {

                if (item[key] instanceof File) {
                    formData.append(key, item[key], item[key].name);
                } else {
                    formData.append(key, item[key]);
                }
            }
        }
        return this.httpClient
            .post(Url, formData, {
                headers: this.headers,
                reportProgress: true,
                observe: 'events'
            })
            .pipe(map(response => response || {} as HttpEvent<any>));
    }

    UpdateWithFile(item: any, url: string): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint + url}`;
        const formData: FormData = new FormData();
        for (const key in item) {
            if (item.hasOwnProperty(key)) {

                if (item[key] instanceof File) {
                    formData.append(key, item[key], item[key].name);
                } else {
                    formData.append(key, item[key]);
                }
            }
        }
        return this.httpClient
            .put(Url, formData, {
                headers: this.headers,
                reportProgress: true,
                observe: 'events'
            })
            .pipe(map(response => response || {} as HttpEvent<any>));
    }

    // Create a Geberic Service with Generic Model for Get All Object
    public GetListItemPaging(url: string): Observable<ServerResponse<TablePagingIndex<TGetAllModel>>> {
        return this.httpClient.get<ServerResponse<TablePagingIndex<TGetAllModel>>>(this.appConfig.apiEndpoint + `${url}`);
    }
    // Create a Geberic Service with Generic Model for Get All Object
    public GetListItem(url: string): Observable<ServerResponse<TGetAllModel[]>> {
        return this.httpClient.get<ServerResponse<TGetAllModel[]>>(this.appConfig.apiEndpoint + `${url}`);
    }
    // Create a Geberic Service with Generic Model for Get All Object
    public GetListItemById(id: string, url: string): Observable<ServerResponse<TGetAllModel>> {
        return this.httpClient.get<ServerResponse<TGetAllModel>>(this.appConfig.apiEndpoint + `${url}/${id}`);
    }

    // Create a Geberic Service with Generic Model for Get Object From Database with Id
    public GetItemById(id: string, url: string): Observable<ServerResponse<TGetItem>> {
        return this.httpClient.get<ServerResponse<TGetItem>>(this.appConfig.apiEndpoint + `${url}/${id}`);
    }

    // Create a Geberic Service with Generic Model for Update Object
    public Update(item: TEditModel, url: string): Observable<ServerResponse<TEditModel>> {
        return this.httpClient.put<ServerResponse<TEditModel>>(this.appConfig.apiEndpoint + `${url}`, item).pipe(
            map(res => {
                if (res.isSuccess) {
                    this.alertService.success('', res.message);
                    return res;
                }
            })
        )
    }
    updateFilter(filters: string): void {
        this.filterSource.next(filters);
    }
    // Create a Geberic Service with Generic Model for Delete Object
    public Delete(id: number, url: string): Observable<ServerResponse<TAddModel>> {
        return this.httpClient.delete<ServerResponse<TAddModel>>(this.appConfig.apiEndpoint + `${url}/${id}`);
    }

}
