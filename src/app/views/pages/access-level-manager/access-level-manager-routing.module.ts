import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessLevelManagerComponent } from './components/access-level-manager/access-level-manager.component';
import { AccessLevelManagerResolver } from './services/access-level-manager-resolver';


const routes: Routes = [
    { path: 'list/:id', component: AccessLevelManagerComponent, resolve: { accessLevels: AccessLevelManagerResolver } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessLevelManagerRoutingModule { }
