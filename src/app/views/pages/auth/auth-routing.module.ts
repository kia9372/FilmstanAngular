import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';
import { RequestActivationCodeComponent } from './request-activation-code/request-activation-code.component';


const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent,
                data: { returnUrl: window.location.pathname }
            },
            {
                path: 'requestActivation',
                component: RequestActivationCodeComponent
            },
            {
                path: 'confirm-code/:hashCode',
                component: ConfirmCodeComponent
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
