import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserManagerService } from '../../../services/user-manager-service';

@Component({
    selector: 'kt-change-phone-number-user',
    templateUrl: './change-phone-number-user.component.html',
    styleUrls: ['./change-phone-number-user.component.scss']
})
export class ChangePhoneNumberUserComponent implements OnInit {

    @Input() userDate: any;
    editPhoneNuberFG: FormGroup;
    constructor(private formBuilder: FormBuilder, private userManagerService: UserManagerService) { }

    ngOnInit(): void {
        this.InitialForm();
    }

    InitialForm(): void {
        this.editPhoneNuberFG = this.formBuilder.group({
            id: [this.userDate['id'], Validators.compose([Validators.required])],
            phoneNumber: ['', Validators.compose([Validators.required])]
        })
    }

    editPhonenumberUser(): void {
        this.userManagerService.ChangePhoneNumber(this.editPhoneNuberFG.value).subscribe();
    }

}
