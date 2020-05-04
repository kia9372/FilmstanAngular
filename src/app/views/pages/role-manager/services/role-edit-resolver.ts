import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoleManagerService } from './role-manager-service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class EditRoleResolver implements Resolve<any>{

    constructor(
        private roleServiceManager: RoleManagerService
        , private activeteRoute: ActivatedRoute) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.paramMap.get('id');
        return this.roleServiceManager.GetItemById(id, 'Role/GetRole').pipe(
            map(res => {
                if (res.isSuccess)
                    return res.data
            })
        )
    };

}
