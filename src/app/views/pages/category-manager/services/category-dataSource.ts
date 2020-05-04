import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { CategoryManagerService } from './category-manager-service';
import { catchError, finalize } from 'rxjs/operators';
import { ServerResponse, TablePagingIndex } from '@app/core/models';
import { GetAllCategoryModel } from '../models/GetAllCategoryModel';

@Injectable({
    providedIn: 'root'
})
export class CategoryDateSource implements DataSource<any>{

    public roleSubject = new BehaviorSubject<any>([]);
    public role$ = this.roleSubject.asObservable();

    private roleLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.roleLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable()

    constructor(private roleManagerService: CategoryManagerService) { }

    loadCategory(pageIndex: number, pageSize: number, filters): void {

        this.roleManagerService.GetListItemPaging(`Category/GetAllCategoryPaging?sorts=id&filters=${filters}&page=${pageIndex}&pageSize=${pageSize}`).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe((news: ServerResponse<TablePagingIndex<GetAllCategoryModel>>) => {
                const data = news.data.records;
                this.roleLengthSource.next(news.data.totalCount);
                this.roleSubject.next(data);
            });
    }

    connect(): Observable<any> {
        return this.roleSubject.asObservable();
    }

    disconnect(): void {
        this.roleSubject.complete();
        this.loadingSubject.complete();
    }

}
