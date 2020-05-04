// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { AuthGuard } from '@app/core/auth';
// Auth

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('app/views/pages/dashboard/dashboard.module').then(
                        m => m.DashboardModule
                    ),
                data: {
                    formName: 'HOME'
                }
            },
            {
                path: 'role-manager',
                loadChildren: () =>
                    import('app/views/pages/role-manager/role-manager.module').then(
                        m => m.RoleManagerModule
                    ),
                data: {
                    formName: 'ROLE_MANAGER'
                }
            },
            {
                path: 'accessLevel-manager',
                loadChildren: () =>
                    import('app/views/pages/access-level-manager/access-level-manager.module').then(
                        m => m.AccessLevelManagerModule
                    ),
                data: {
                    formName: 'ACCESS_LEVEL_MANAGER'
                }
            },
            {
                path: 'category-manager',
                loadChildren: () =>
                    import('app/views/pages/category-manager/category-manager.module').then(
                        m => m.CategoryManagerModule
                    ),
                data: {
                    formName: 'CATEGORY_MANAGER'
                }
            },
            {
                path: 'user-manager',
                loadChildren: () =>
                    import('app/views/pages/user-manager/user-manager.module').then(
                        m => m.UserManagerModule
                    ),
                data: {
                    formName: 'USER_MANAGER'
                }
            },
            {
                path: 'setting',
                loadChildren: () =>
                    import('app/views/pages/setting/setting.module').then(
                        m => m.SettingModule
                    ),
                data: {
                    formName: 'SETTING'
                }
            },
            {
                path: 'forbidden',
                loadChildren: () =>
                    import('app/views/pages/forbidden/forbidden.module').then(
                        m => m.ForbiddenModule
                    )
            },
            {
                path: 'notFound',
                loadChildren: () =>
                    import('app/views/pages/not-found/not-found.module').then(
                        m => m.NotFoundModule
                    )
            },
            { path: 'error/:type', component: ErrorPageComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '**', redirectTo: 'notFound', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
