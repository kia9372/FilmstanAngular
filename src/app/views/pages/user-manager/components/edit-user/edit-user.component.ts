import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'kt-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

    data: any;
    constructor(private activateRoute: ActivatedRoute) {
        this.data=this.activateRoute.snapshot.data['getUserInfo'];
     }

    ngOnInit(): void {
    }

}
