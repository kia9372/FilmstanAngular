// Anglar
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppErrorHandler } from './error-handler';
// Layout Directives
// Services
import {
	ContentAnimateDirective,
	FirstLetterPipe,
	GetObjectPipe,
	HeaderDirective,
	JoinPipe,
	MenuDirective,
	OffcanvasDirective,
	SafePipe,
	ScrollTopDirective,
	SparklineChartDirective,
	StickyDirective,
	TabClickEventDirective,
	TimeElapsedPipe,
	ToggleDirective
} from './base/layout';
import { RouterModule } from '@angular/router';
import { BrowserStorageService } from './auth/services/browser-storage.Service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { APP_CONFIG, AppConfig } from './config/app.config';
import { HttpInterceptorServise } from './interceptors/httpinterceptor.service';
import { AlertService } from './services/alert.servise';
import { UtilsService } from './services/utils.service';
import { PermissionDirective } from './auth/directives/permission.directive';
import { AuthGuard } from './auth/services/auth.guard';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { RouterExtService } from './services/route-exect-service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		DpDatePickerModule,
		MaterialFileInputModule,
		TranslateModule.forChild()
	],
	declarations: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		PermissionDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe
	],
	exports: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		PermissionDirective,
		MaterialFileInputModule,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe,
		// components
		
	],
	providers: [
		// { provide: ErrorHandler, useClass: AppErrorHandler },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{
			provide: APP_CONFIG,
			useValue: AppConfig
		},
		BrowserStorageService, AlertService, UtilsService, AuthGuard , RouterExtService
	]
})
export class CoreModule {}
