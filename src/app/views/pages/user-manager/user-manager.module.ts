import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagerRoutingModule } from './user-manager-routing.module';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { ChangePublicUseRInfoComponent } from './components/edit-user/change-public-use-rinfo/change-public-use-rinfo.component';
import { ChangePasswordUserComponent } from './components/edit-user/change-password-user/change-password-user.component';
import { ChangePhoneNumberUserComponent } from './components/edit-user/change-phone-number-user/change-phone-number-user.component';
import { ChangeUserRoleComponent } from './components/edit-user/change-user-role/change-user-role.component';



@NgModule({
  declarations: [UserManagerComponent, AddUserComponent, EditUserComponent, ListUserComponent, ChangePublicUseRInfoComponent, ChangePasswordUserComponent, ChangePhoneNumberUserComponent, ChangeUserRoleComponent],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    TranslateModule.forChild()
  ]
})
export class UserManagerModule { }
