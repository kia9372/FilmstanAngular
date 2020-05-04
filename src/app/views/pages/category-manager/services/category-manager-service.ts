import { Injectable } from '@angular/core';
import { GenericServicService } from '@app/core/services/generic-service';
import { EditCategoryModel } from '../models/EditCategoryModel';
import { GetAllCategoryModel } from '../models/GetAllCategoryModel';
import { GetOneCategoryModel } from '../models/GetOneCategoryModel';
import { AddRoleModel } from '../../role-manager/models/add-role-model';
import { AddCategoryModel } from '../models/add-category-model';

@Injectable({
    providedIn: 'root'
})

export class CategoryManagerService extends GenericServicService<AddCategoryModel, EditCategoryModel, GetAllCategoryModel, GetOneCategoryModel>
{

}
