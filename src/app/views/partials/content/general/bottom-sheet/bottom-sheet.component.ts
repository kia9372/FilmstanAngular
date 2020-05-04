import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'kt-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})

export class BottomSheetComponent implements OnInit {
  text: string;
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
	@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  openLink(event: MouseEvent): void {
	this._bottomSheetRef.dismiss();
	event.preventDefault();
  }

  ngOnInit() {
  }

}
