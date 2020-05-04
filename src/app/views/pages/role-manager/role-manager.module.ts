import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagerRoutingModule } from './role-manager-routing.module';
import { AddRoleComponent } from './compoentns/add-role/add-role.component';
import { EditRoleComponent } from './compoentns/edit-role/edit-role.component';
import { RoleListComponent } from './compoentns/role-list/role-list.component';
import { RoleManagerComponent } from './compoentns/role-manager.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoleListFilterComponent } from './compoentns/role-list/role-list-filter/role-list-filter.component';


@NgModule({
  declarations: [RoleManagerComponent, AddRoleComponent, EditRoleComponent, RoleListComponent, RoleListFilterComponent],
  imports: [
    CommonModule,
    RoleManagerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    TranslateModule.forChild()
  ]
})
export class RoleManagerModule { }
