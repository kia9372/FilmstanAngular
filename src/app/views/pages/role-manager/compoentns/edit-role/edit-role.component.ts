import { Component, OnInit } from '@angular/core';
import { RoleManagerService } from '../../services/role-manager-service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditRoleModel } from '../../models/add-role-model';
import { AlertService } from '@app/core/services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'kt-edit-role',
    templateUrl: './edit-role.component.html',
    styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

    subscrption: Subscription;

    editRoleFG: FormGroup;
    editRoleModel = {} as EditRoleModel;
    oldEditRoleModel = {} as EditRoleModel;

    constructor(
        private fromBuilder: FormBuilder
        , private roleMangerService: RoleManagerService
        , private activateRoute: ActivatedRoute
        , private alertService: AlertService) {
        this.editRoleModel = this.activateRoute.snapshot.data['role'];
        this.oldEditRoleModel = this.activateRoute.snapshot.data['role'];
    }

    ngOnInit(): void {
        this.initialForm();
    }

    initialForm(): void {
        this.editRoleFG = this.fromBuilder.group({
            name: [this.oldEditRoleModel.name, Validators.compose([Validators.required])],
            description: [this.oldEditRoleModel.description, Validators.compose([Validators.required])]
        })
        console.log(this.editRoleFG.value)
    }

    editRole(): void {
        this.editRoleModel = this.editRoleFG.value;
        this.editRoleModel.id = this.oldEditRoleModel.id;
        this.subscrption = this.roleMangerService.Update(this.editRoleModel, 'Role/UpdateRole').subscribe(x => {
            if (x.isSuccess) {
                return this.alertService.success('', x.message);
            }
        })
    }
}
