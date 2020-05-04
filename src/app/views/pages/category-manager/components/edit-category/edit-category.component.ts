import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetOneCategoryModel } from '../../models/GetOneCategoryModel';
import { GetAllCategoryModel } from '../../models/GetAllCategoryModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryManagerService } from '../../services/category-manager-service';

@Component({
    selector: 'kt-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {


    categoryListModel: GetAllCategoryModel[] = [];
    oldCategoryModel = {} as GetOneCategoryModel;
    editCategoryFG: FormGroup;


    constructor(private activatedRoute: ActivatedRoute
        , private categoryManagerService: CategoryManagerService
        , private router: Router
        , private fromBuilder: FormBuilder) {
        this.oldCategoryModel = this.activatedRoute.snapshot.data['getDeatail'];
        this.categoryListModel = this.activatedRoute.snapshot.data['getCategory'];
    }

    ngOnInit(): void {
        this.initialForm();
    }

    initialForm(): void {
        this.editCategoryFG = this.fromBuilder.group({
            name: [this.oldCategoryModel.name, Validators.compose([Validators.required])],
            parentId: [this.oldCategoryModel.parentId, Validators.compose([Validators.required])]
        })
    }

    editategory(): void {
        let model = {} as GetOneCategoryModel;
        model = this.editCategoryFG.value;
        model.id = this.oldCategoryModel.id;
        this.categoryManagerService.Update(model, 'Category/UpdateCategory').subscribe(res => {
            if (res.isSuccess) {
                this.router.navigate(['/category-manager']);
            }
        })
    }
}
