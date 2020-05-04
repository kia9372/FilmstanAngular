import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryManagerService } from '../../services/category-manager-service';
import { GetAllCategoryModel } from '../../models/GetAllCategoryModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCategoryModel } from '../../models/add-category-model';

@Component({
    selector: 'kt-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

    addCategoryFG: FormGroup;
    data: GetAllCategoryModel[];

    constructor(
        private categoryLevelManagerService: CategoryManagerService
        , private formBuilder: FormBuilder
        , private router:Router
        , private activateRoute: ActivatedRoute
        , private alertService: AlertService) {
        this.data = this.activateRoute.snapshot.data['getCategory'];
    }

    ngOnInit(): void {
        this.initalFormGroup();
    }

    initalFormGroup(): void {
        this.addCategoryFG = this.formBuilder.group({
            name: ['', Validators.required],
            parentId: ['']
        })
    }

    addCategory(): void {
        let model = {} as AddCategoryModel;
        model = this.addCategoryFG.value;
        this.categoryLevelManagerService.Create(model, 'Category/AddCategory').subscribe(data=>{
            if(data.isSuccess)
            {
                this.router.navigate(['/category-manager']);
            }
        });
    }

}
