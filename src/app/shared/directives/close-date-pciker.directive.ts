import { Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms'

@Directive({
  selector: '[ktCloseDatePciker]'
})
export class CloseDatePcikerDirective {


  constructor() { }
  @HostListener("change", ['$event'])
  input(event) {
    console.log(`typed! ${event.target.value}`);
  }

}
