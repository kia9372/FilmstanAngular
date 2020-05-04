import { Component, OnInit } from '@angular/core';
import { EmailModel } from '../../models/email-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingManagerService } from '../../services/setting-manager-service';

@Component({
    selector: 'fim-email-setting',
    templateUrl: './email-setting.component.html',
    styleUrls: ['./email-setting.component.scss']
})
export class EmailSettingComponent implements OnInit {

    emailSettingFg: FormGroup;
    model = {} as EmailModel;

    constructor(private formBuilder: FormBuilder, private settingService: SettingManagerService<EmailModel>) {
        this.fetchDate();
        this.Intitialform();
    }

    ngOnInit(): void {
    }

    Intitialform(): void {
        console.log(this.model)
        this.emailSettingFg = this.formBuilder.group({
            from: ['', Validators.compose([Validators.required])],
            smtpServer: ['', Validators.compose([Validators.required])],
            port: ['', Validators.compose([Validators.required])],
            userName: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
        });
    }

    fetchDate(): void {
        this.settingService.GetSetting('Setting/GetEmailetting').subscribe(data => {
            this.emailSettingFg.patchValue({
                from: data.data.from,
                smtpServer: data.data.smtpServer,
                port: data.data.port,
                userName: data.data.username,
                password: data.data.password
            })
        });
    }

    saveSetting(): void {
        let model = {} as EmailModel;
        model = this.emailSettingFg.value;
        this.settingService.SetSetting(model, 'Setting/SetEmailSetting').subscribe();
    }

}
