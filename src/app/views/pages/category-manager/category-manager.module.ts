import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryManagerRoutingModule } from './category-manager-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CategoryManagerComponent } from './components/category-manager.component';
import { ListCategoryFilterComponent } from './components/list-category/list-category-filter/list-category-filter.component';


@NgModule({
  declarations: [AddCategoryComponent,CategoryManagerComponent,EditCategoryComponent,ListCategoryComponent, ListCategoryFilterComponent],
  imports: [
    CommonModule,
    CategoryManagerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    TranslateModule.forChild()
  ]
})
export class CategoryManagerModule { }
