import { Component, OnInit, ChangeDetectorRef, Injector, Inject } from '@angular/core';
import { UserManagerService } from '../../services/user-manager-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { AlertService } from '@app/core/services';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { APP_CONFIG, IAppConfig } from '@app/core/config';
import { AddUserModel } from '../../models/add-user-model';

@Component({
    selector: 'kt-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

    addUserFG: FormGroup;
    loading: boolean = false;
    queueProgress: any;
    subscriptions: Subscription;

    constructor(private userManagerService: UserManagerService
        , private cdRef: ChangeDetectorRef
        , @Inject(APP_CONFIG) public appConfig: IAppConfig
        , private route: Router
        , private alertService: AlertService
        , private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.InitialForm();
    }

    InitialForm(): void {
        this.addUserFG = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required])],
            family: ['', Validators.compose([Validators.required])],
            email: [''],
            password: ['', Validators.compose([Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.required])],
            phoneNumber: ['', Validators.compose([Validators.required])],
            username: ['', Validators.compose([Validators.required])],
            photo: ['']
        })
    }

    RegisterUser(): void {
        let addModel={} as AddUserModel;
        const selectedFiles = this.addUserFG.get('photo').value;
		addModel = Object.assign({}, this.addUserFG.value);

		if (selectedFiles) {
			addModel.photo = selectedFiles['files'][0];
        }

        console.log(addModel)
        this.loading = true;
        this.subscriptions = this.userManagerService.CreateWithFile(addModel, 'Register/AddUser')
            .subscribe(
                (user: HttpEvent<any>) => {
                    switch (user.type) {
                        case HttpEventType.UploadProgress:
                            if (user.total) {
                                this.queueProgress = Math.round(user.loaded / user.total * 100);
                                this.cdRef.detectChanges();
                            }
                            break;
                        case HttpEventType.Response:
                            if (user.body['isSuccess']) {
                                this.queueProgress = null;
                                this.alertService.success('', user.body['message']);
                                this.route.navigate(['/user-manager']);
                            } else {
                                this.cdRef.detectChanges();
                            }
                            this.loading = false;
                            this.queueProgress = null;
                            break;
                    }
                },
                error => {
                    this.loading = false;
                    this.queueProgress = null;
                });
    }

}
