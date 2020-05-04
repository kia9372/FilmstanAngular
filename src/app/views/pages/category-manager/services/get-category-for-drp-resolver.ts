import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CategoryManagerService } from './category-manager-service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GetAllCategoryForDrp implements Resolve<any> {

    constructor(private categoryManagerService: CategoryManagerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      return  this.categoryManagerService.GetListItem('Category/GetAllCategory').pipe(
            map(res => {
                if (res.isSuccess) {
                    return res.data;
                }
                return null;
            })
        )

    }

}
