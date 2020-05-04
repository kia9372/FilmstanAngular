import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryManagerService } from '../../../services/category-manager-service';

@Component({
  selector: 'fim-list-category-filter',
  templateUrl: './list-category-filter.component.html',
  styleUrls: ['./list-category-filter.component.scss']
})
export class ListCategoryFilterComponent implements OnInit {

    @Input() loading: any;

    subscriptions: Subscription;
    filtersForm: FormGroup;
    filter: string;

    constructor(private formBuilder: FormBuilder, private categoryManagerService: CategoryManagerService) { }

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
        this.categoryManagerService.updateFilter(this.MakeFiltersForTable(this.f).toString())
    }

    MakeFiltersForTable(formControls: any): String {

        Object.keys(formControls).forEach(key => {
            if ((formControls[key].value + '').length > 0) {
                if (key === 'name') {
                    this.filter = `name_=${formControls[key].value},`
                }
            }
        });
        return this.filter;
    }
}
