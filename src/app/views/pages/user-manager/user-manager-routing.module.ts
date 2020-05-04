import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { GetUserEditResolver } from './services/get-user-edir-resolver';


const routes: Routes = [
    {
        path: 'add', component: AddUserComponent
    },
    {
        path: '', component: ListUserComponent
    },
    {
        path: 'list', component: ListUserComponent
    },
    {
        path: ':id/edit', component: EditUserComponent, resolve: { getUserInfo: GetUserEditResolver }
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserManagerRoutingModule { }
