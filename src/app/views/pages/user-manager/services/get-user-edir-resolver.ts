import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserManagerService } from './user-manager-service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class GetUserEditResolver implements Resolve<any>{

    constructor(private userManggerService: UserManagerService) { }
    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
        let id = route.paramMap.get('id');
      return  this.userManggerService.GetItemById(id, 'User/GetUserById').pipe(
            map(res => {
                if (res.isSuccess) {
                    return res.data;
                }
                return null;
            })
        )

    }


}
