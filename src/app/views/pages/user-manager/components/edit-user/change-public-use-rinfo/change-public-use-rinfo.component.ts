import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { UserManagerService } from '../../../services/user-manager-service';
import { AlertService } from '@app/core/services';
import { Router } from '@angular/router';
import { AddUserModel } from '../../../models/add-user-model';
import { EditUserModel } from '../../../models/edit-user-model';

@Component({
    selector: 'kt-change-public-use-rinfo',
    templateUrl: './change-public-use-rinfo.component.html',
    styleUrls: ['./change-public-use-rinfo.component.scss']
})
export class ChangePublicUseRInfoComponent implements OnInit {

    @Input() userDate: any;
    editUserFG: FormGroup;
    queueProgress: any;
    subscriptions: Subscription;
    loading: boolean = false;

    constructor(private formBuilder: FormBuilder
        , private userManagerService: UserManagerService
        , private alertService: AlertService
        , private route: Router
        , private cdRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.InitialForm();
    }

    InitialForm(): void {
        this.editUserFG = this.formBuilder.group({
            id: [this.userDate['id']],
            username: [this.userDate['username'], Validators.compose([Validators.required])],
            email: [this.userDate['email'], Validators.compose([Validators.required])],
            name: [this.userDate['name'], Validators.compose([Validators.required])],
            family: [this.userDate['family'], Validators.compose([Validators.required])],
            photo: ['']
        })
    }

    editUser(): void {
        let addModel = {} as EditUserModel;
        const selectedFiles = this.editUserFG.get('photo').value;
        addModel = Object.assign({}, this.editUserFG.value);

        if (selectedFiles) {
            addModel.photo = selectedFiles['files'][0];
        }

        console.log(addModel)
        this.loading = true;
        this.subscriptions = this.userManagerService.UpdateWithFile(addModel, 'User/UpdateUser')
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
