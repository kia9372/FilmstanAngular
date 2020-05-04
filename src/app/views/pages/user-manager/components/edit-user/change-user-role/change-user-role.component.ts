import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { UserManagerService } from '../../../services/user-manager-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'kt-change-user-role',
    templateUrl: './change-user-role.component.html',
    styleUrls: ['./change-user-role.component.scss']
})
export class ChangeUserRoleComponent implements OnInit {

    @Input() userDate: any;
    changeRoleFG: FormGroup;
    data: any;
    roles: any;


    constructor(private userManagerService: UserManagerService
        , private cdRef: ChangeDetectorRef
        , private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.InitialForm();
        this.FetchData();
        this.cdRef.detectChanges();
    }

    InitialForm(): void {
        this.changeRoleFG = this.formBuilder.group({
            userId: [this.userDate['id']],
            roleId: ['', Validators.compose([Validators.required])]
        })
    }



    FetchData(): void {
        this.userManagerService.GetCurrentUserRoleId(this.userDate['id']).subscribe(data => {
            this.data = data['data'],
                this.roles = data['data']['roles']
            this.changeRoleFG.patchValue({
                roleId: data['data']['currenrRoleId']
            })
        })
    }

    editRole(): void {
        this.userManagerService.ChangeUserRole(this.changeRoleFG.value).subscribe();
    }

}
