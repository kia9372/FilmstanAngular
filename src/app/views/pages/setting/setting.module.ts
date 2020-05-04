import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './components/setting/setting.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EmailSettingComponent } from './components/email-setting/email-setting.component';
import { SmsSettingComponent } from './components/sms-setting/sms-setting.component';
import { RegisterUserSettingComponent } from './components/register-user-setting/register-user-setting.component';


@NgModule({
  declarations: [SettingComponent, EmailSettingComponent, SmsSettingComponent, RegisterUserSettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    TranslateModule.forChild()
  ]
})
export class SettingModule { }
