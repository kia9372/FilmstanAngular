import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CategoryManagerService } from './category-manager-service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class GetCatgoryDetailResolver implements Resolve<any>{

    constructor(
        private roleServiceManager: CategoryManagerService
        , private activeteRoute: ActivatedRoute) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.paramMap.get('id');
        return this.roleServiceManager.GetItemById(id, 'Category/GetCategoryById').pipe(
            map(res => {
                if (res.isSuccess)
                    return res.data
            })
        )
    };

}
