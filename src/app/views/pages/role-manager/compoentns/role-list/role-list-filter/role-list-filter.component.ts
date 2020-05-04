import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoleManagerService } from '../../../services/role-manager-service';

@Component({
    selector: 'fim-role-list-filter',
    templateUrl: './role-list-filter.component.html',
    styleUrls: ['./role-list-filter.component.scss']
})
export class RoleListFilterComponent implements OnInit {

    @Input() loading: any;

    subscriptions: Subscription;
    filtersForm: FormGroup;
    filter: string;

    constructor(private formBuilder: FormBuilder, private roleManagerService: RoleManagerService) { }

    ngOnInit(): void {
        this.InitialForm();
    }

    InitialForm(): void {
        this.filtersForm = this.formBuilder.group({
            name: ['']
        })
    }

    get f(): any {
        return this.filtersForm.controls;
    }

    loadFilters(): void {
        this.roleManagerService.updateFilter(this.MakeFiltersForTable(this.f).toString())
    }

    MakeFiltersForTable(formControls: any): String {

        Object.keys(formControls).forEach(key => {
            if ((formControls[key].value + '').length > 0) {
                if (key === 'name') {
                    this.filter = `${key}_=${formControls[key].value},`
                }
            }
        });
        return this.filter;
    }
}
