// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { ForbiddenComponent } from './forbidden.component';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: ForbiddenComponent
			},
		]),
	],
	providers: [],
	declarations: [
		ForbiddenComponent
	]
})
export class ForbiddenModule {
}
