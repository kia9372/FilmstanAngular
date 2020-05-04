import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/auth';
import { AlertService } from '@app/core/services';

@Component({
    selector: 'kt-confirm-code',
    templateUrl: './confirm-code.component.html',
    styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {

    mask = [/\d/, '-', /\d/, '-', /\d/, '-', /\d/, '-', /\d/, '-', /\d/];

    confirmFG: FormGroup;
    hashcode: string;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        private activeRoute: ActivatedRoute) {
        this.hashcode = this.activeRoute.snapshot.paramMap.get('hashCode');
        if (this.hashcode === undefined || this.hashcode === null) {
            this.router.navigate(['/auth/login'])
        }
    }

    ngOnInit(): void {
        this.initialForm();
    }

    initialForm(): void {
        this.confirmFG = this.formBuilder.group({
            hashCode: [this.hashcode, Validators.compose([Validators.required])],
            code: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        })
    }

    sendCode(): void {
        this.authService.sendConfirmCodeRequest(this.confirmFG.value).subscribe()
    }

}
