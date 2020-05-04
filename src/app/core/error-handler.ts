import { ErrorHandler } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export class AppErrorHandler implements ErrorHandler {
  /**
   *
   */
  constructor(private toastr: ToastrService) {
	
  }
  handleError(error: any): void {
	this.toastr.error(error);
	console.log(error);
  }
}
