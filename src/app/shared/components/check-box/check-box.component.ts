import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fim-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {

  @Input() value;
  constructor() { }

  ngOnInit(): void {
  }

}
