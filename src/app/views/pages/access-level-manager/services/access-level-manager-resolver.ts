import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccessLevelManagerService } from './access-level-manager-service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AccessLevelManagerResolver implements Resolve<any>{

    constructor(
        private roleServiceManager: AccessLevelManagerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.paramMap.get('id');
        return this.roleServiceManager.GetItemById(id, 'AccessLevel/GetPermissionList').pipe(
            map(res => {
                if (res.isSuccess)
                    return res.data
            })
        )
    };

}
