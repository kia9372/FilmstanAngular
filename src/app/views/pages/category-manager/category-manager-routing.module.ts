import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { GetAllCategoryForDrp } from './services/get-category-for-drp-resolver';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { GetCatgoryDetailResolver } from './services/get-category-detail-resolve';

const routes: Routes = [
    { path: '', component: ListCategoryComponent },
    { path: 'list', component: ListCategoryComponent },
    { path: 'add', component: AddCategoryComponent, resolve: { getCategory: GetAllCategoryForDrp } },
    { path: ':id/edit', component: EditCategoryComponent, resolve: {getDeatail:GetCatgoryDetailResolver, getCategory: GetAllCategoryForDrp } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryManagerRoutingModule { }
