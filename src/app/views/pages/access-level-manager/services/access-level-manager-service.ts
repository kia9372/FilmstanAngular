import { Injectable } from '@angular/core';
import { GenericServicService } from '@app/core/services/generic-service';
import { GetAllAccessLevelModel } from '../models/get-all-accessLevel-model';
import { AccessLevelSemdModel } from '../models/accessLevel-send-model';

@Injectable({
    providedIn: 'root'
})

export class AccessLevelManagerService extends GenericServicService<AccessLevelSemdModel, null, GetAllAccessLevelModel, null>  {

}
