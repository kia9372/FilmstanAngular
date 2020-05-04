import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleManagerService } from '../../services/role-manager-service';
import { Subscription } from 'rxjs';
import { AddRoleModel } from '../../models/add-role-model';
import { AlertService } from '@app/core/services';

@Component({
    selector: 'kt-add-role',
    templateUrl: './add-role.component.html',
    styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

    subscrption: Subscription;

    addRoleFG: FormGroup;
    addRoleModel = {} as AddRoleModel;

    constructor(
        private fromBuilder: FormBuilder
        , private roleMangerService: RoleManagerService
        , private alertService:AlertService) { }

    ngOnInit(): void {
        this.initialForm();
    }

    initialForm(): void {
        this.addRoleFG = this.fromBuilder.group({
            name: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])]
        })
    }

    addRole(): void {
        this.addRoleModel = this.addRoleFG.value;
        console.log(this.addRoleModel)
        this.subscrption = this.roleMangerService.Create(this.addRoleModel, 'Role/AddRole').subscribe(x => {
            if(x.isSuccess)
            {
              return  this.alertService.success('',x.message);
            }
            return this.alertService.error('',x.message);
        })
    }

}
