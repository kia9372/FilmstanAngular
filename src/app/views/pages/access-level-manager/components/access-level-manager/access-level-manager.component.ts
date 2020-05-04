import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/core/services';
import { GetAllAccessLevelModel } from '../../models/get-all-accessLevel-model';
import { ItemNode } from '@app/shared/components/tree-roles/model/ItemNode.model';
import { AccessLevelSemdModel } from '../../models/accessLevel-send-model';
import { AccessLevelManagerService } from '../../services/access-level-manager-service';

@Component({
    selector: 'kt-access-level-manager',
    templateUrl: './access-level-manager.component.html',
    styleUrls: ['./access-level-manager.component.scss']
})
export class AccessLevelManagerComponent implements OnInit {

    data: GetAllAccessLevelModel[];
    selectedList: string[];
    roleId: string;
    constructor(
        private accessLevelManagerService: AccessLevelManagerService
        , private activateRoute: ActivatedRoute
        , private alertService: AlertService) {
        this.data = this.activateRoute.snapshot.data['accessLevels'];
        this.roleId = this.activateRoute.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
    }
    SelectedAccessRole(event: ItemNode[]): void {
        this.selectedList = [];
        event.forEach(element => {
            this.selectedList.push(element.actionId);
        });
    }

    setRole(): void {
        let model={} as AccessLevelSemdModel;
        model.access = this.selectedList;
        model.roleId = this.roleId;
        this.accessLevelManagerService.Create(model, 'AccessLevel/SetAcceessLevel').subscribe(x => {
            if (x.isSuccess) {
                this.alertService.success('', x.message)
            }else{
                this.alertService.error('', x.message)
            }
        })
    }
}
