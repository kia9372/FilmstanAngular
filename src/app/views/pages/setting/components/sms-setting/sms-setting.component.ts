import { Component, OnInit } from '@angular/core';
import { SettingManagerService } from '../../services/setting-manager-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SmsModel } from '../../models/sms-model';

@Component({
    selector: 'fim-sms-setting',
    templateUrl: './sms-setting.component.html',
    styleUrls: ['./sms-setting.component.scss']
})
export class SmsSettingComponent implements OnInit {

    smsSettingFg: FormGroup;
    model = {} as SmsModel;

    constructor(private formBuilder: FormBuilder, private settingService: SettingManagerService<SmsModel>) {
        this.fetchDate();
        this.Intitialform();
    }

    ngOnInit(): void {
    }

    Intitialform(): void {
        console.log(this.model)
        this.smsSettingFg = this.formBuilder.group({
            lineNumber: [this.model.lineNumber, Validators.compose([Validators.required])],
            userApikey: [this.model.userApikey, Validators.compose([Validators.required])],
            secretKey: [this.model.secretKey, Validators.compose([Validators.required])]
        });
    }

    fetchDate(): void {
        this.settingService.GetSetting('Setting/GetSmsSetting').subscribe(data => {
            this.smsSettingFg.patchValue({
                lineNumber: data.data.lineNumber,
                userApikey: data.data.userApikey,
                secretKey: data.data.secretKey
            })
        });
    }

    saveSetting(): void {
        let model = {} as SmsModel;
        model = this.smsSettingFg.value;
        this.settingService.SetSetting(model,'Setting/SetSMSSetting').subscribe();
    }

}
