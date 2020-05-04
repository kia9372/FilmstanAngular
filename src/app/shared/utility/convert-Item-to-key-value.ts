import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeyValue } from '../components/searchable-dropdown/searchable-dropdown/searchable-dropdown.component';

@Injectable({
	providedIn: 'root'
})

export class ConvertItemToKeyValue {

	convertLestToKeyValue(key: number, value: string, ): KeyValue[] {
		let keyValue: KeyValue[] = [];
		
		return keyValue;
	}

}
