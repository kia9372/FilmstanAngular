import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/core/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'kt-request-activation-code',
    templateUrl: './request-activation-code.component.html',
    styleUrls: ['./request-activation-code.component.scss']
})
export class RequestActivationCodeComponent implements OnInit {

    requestFG: FormGroup;
    constructor(private formBuilder: FormBuilder,private router:Router, private authService: AuthService) { }

    ngOnInit(): void {
        this.InitialForm();
    }


    InitialForm(): void {
        this.requestFG = this.formBuilder.group({
            phoneNumber: ['', Validators.compose([Validators.required])]
        })
    }

    sendRequest(): void {
        this.authService.SendActivationCode(this.requestFG.value).subscribe(data=>{
            if(data.isSuccess)
            {
                this.router.navigate(['/auth/confirm-code/',data.data])
            }
        });
    }

}
