import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessLevelManagerRoutingModule } from './access-level-manager-routing.module';
import { AccessLevelManagerComponent } from './components/access-level-manager/access-level-manager.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
    declarations: [AccessLevelManagerComponent],
    imports: [
        CommonModule,
        AccessLevelManagerRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CoreModule,
        TranslateModule.forChild()
    ]
})
export class AccessLevelManagerModule { }
