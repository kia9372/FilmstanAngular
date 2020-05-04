import { Injectable, Inject } from '@angular/core';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '../searchable-dropdown/searchable-dropdown.component';
import { SendDateModel } from '../models/send-data-model';
import { APP_CONFIG, IAppConfig } from '@app/core/config';

@Injectable({
	providedIn: 'root'
})

export class SearchableDropDownService {

	constructor(
		@Inject(APP_CONFIG) private appConfig: IAppConfig,
		private httpClient: HttpClient) { }

	getAll(url: string, item: SendDateModel): Observable<KeyValue[]> {

		const Url = `${this.appConfig.apiEndpoint}${url}`;
		return this.httpClient.post<KeyValue[]>(Url, item);

	}

	GetAll(url: string, item: SendDateModel): Observable<KeyValue[]> {

		const Url = `${this.appConfig.apiEndpoint}${url}`;
		return this.httpClient.get<KeyValue[]>(Url);

	}

}
