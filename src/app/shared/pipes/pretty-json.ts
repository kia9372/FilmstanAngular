import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
    name: 'prettyShowJson'
})
export class PrettyShowJson implements PipeTransform {
    transform(value: string, ...args: any[]) {

        value.replace("\"", " ")
        value.replace("{"," ")
        return value
    }

}