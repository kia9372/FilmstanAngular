import { Injectable } from "@angular/core";
import { GenericServicService } from '@app/core/services/generic-service';
import { AddRoleModel, EditRoleModel, GetRoleModel } from '../models/add-role-model';

@Injectable({
    providedIn: 'root'
})

export class RoleManagerService extends GenericServicService<AddRoleModel, EditRoleModel, GetRoleModel, GetRoleModel>  {

}
