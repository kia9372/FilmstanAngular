import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserManagerService } from '../../../services/user-manager-service';

@Component({
    selector: 'kt-change-password-user',
    templateUrl: './change-password-user.component.html',
    styleUrls: ['./change-password-user.component.scss']
})
export class ChangePasswordUserComponent implements OnInit {

    @Input() userDate: any;
    changePasswordFG: FormGroup;
    constructor(private formBuilder: FormBuilder, private userManagerService: UserManagerService) { }

    ngOnInit(): void {
        this.InitialForm();
    }

    InitialForm(): void {
        this.changePasswordFG = this.formBuilder.group({
            id: [this.userDate.id],
            password: ['', Validators.compose([Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.required])],
        })
    }

    changePassword(): void {
        this.userManagerService.ChangePasswordUser(this.changePasswordFG.value).subscribe();
    }
}
