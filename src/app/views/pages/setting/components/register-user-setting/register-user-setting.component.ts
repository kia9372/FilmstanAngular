import { Component, OnInit } from '@angular/core';
import { RegisterUserModel } from '../../models/register-user-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingManagerService } from '../../services/setting-manager-service';
import { RoleManagerService } from '@app/views/pages/role-manager/services/role-manager-service';
import { GetRoleModel } from '@app/views/pages/role-manager/models/add-role-model';
import { SendCodeVerification } from '../../models/SendCodeVerification';

@Component({
    selector: 'fim-register-user-setting',
    templateUrl: './register-user-setting.component.html',
    styleUrls: ['./register-user-setting.component.scss']
})
export class RegisterUserSettingComponent implements OnInit {

    smsSettingFg: FormGroup;
    model = {} as RegisterUserModel;
    sendCode=SendCodeVerification;
    roleModel: GetRoleModel[] = [];

    constructor(private formBuilder: FormBuilder
        , private roleManagerService: RoleManagerService
        , private settingService: SettingManagerService<RegisterUserModel>) {
        this.fetchDate();
        this.Intitialform();
    }

    ngOnInit(): void {
    }

    Intitialform(): void {
        console.log(this.model)
        this.smsSettingFg = this.formBuilder.group({
            registerRoleByAdmin: ['', Validators.compose([Validators.required])],
            registerRoleByUser: ['', Validators.compose([Validators.required])],
            sendCodeVerification: ['', Validators.compose([Validators.required])]
        });
    }

    fetchDate(): void {

        this.roleManagerService.GetListItem('Role/GetAllRoles').subscribe(data => {
            this.roleModel = data.data
        });

        this.settingService.GetSetting('Setting/GetRegisterUserSetting').subscribe(data => {
            this.smsSettingFg.patchValue({
                registerRoleByAdmin: data.data.registerRoleByAdmin,
                registerRoleByUser: data.data.registerRoleByUser,
                sendCodeVerification: data.data.sendCodeVerificationString
            })
        });
    }
    get f(): any {
        return this.smsSettingFg.controls;
    }

    saveSetting(): void {
        let model = {} as RegisterUserModel;
        model = this.smsSettingFg.value;
        model.sendCodeVerificationString=this.smsSettingFg.value['sendCodeVerification']
        this.settingService.SetSetting(model, 'Setting/SetRegisterUserSetting').subscribe();
    }

}
