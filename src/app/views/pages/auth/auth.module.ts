// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextMaskModule } from 'angular2-text-mask';
// Translate
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// CRUD
import { InterceptService } from '../../../core/base/crud';
// Module components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
// Auth
import { AuthGuard, authReducer, AuthService } from '../../../core/auth';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';
import { RequestActivationCodeComponent } from './request-activation-code/request-activation-code.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		AuthRoutingModule,
		MatInputModule,
		MatFormFieldModule,
        MatCheckboxModule,
        TextMaskModule,
		TranslateModule.forChild(),
		StoreModule.forFeature('auth', authReducer),
	],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
	],
	exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		AuthNoticeComponent,
		ConfirmCodeComponent,
		RequestActivationCodeComponent
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders<AuthModule> {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				AuthGuard
			]
		};
	}
}
