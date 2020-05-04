import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleListComponent } from './compoentns/role-list/role-list.component';
import { AddRoleComponent } from './compoentns/add-role/add-role.component';
import { EditRoleComponent } from './compoentns/edit-role/edit-role.component';
import { EditRoleResolver } from './services/role-edit-resolver';


const routes: Routes = [
    {
        path: '', component: RoleListComponent
    },
    {
        path: 'list', component: RoleListComponent
    },
    {
        path: 'add', component: AddRoleComponent
    },
    {
        path: ':id/edit', component: EditRoleComponent,
        resolve: { role: EditRoleResolver }
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleManagerRoutingModule { }
