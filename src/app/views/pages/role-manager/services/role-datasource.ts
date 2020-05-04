import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RoleManagerService } from './role-manager-service';
import { catchError, finalize } from 'rxjs/operators';
import { GetRoleModel } from '../models/add-role-model';
import { TablePagingIndex, ServerResponse } from '@app/core/models';

@Injectable({
    providedIn: 'root'
})
export class RoleDateSource implements DataSource<any>{

    public roleSubject = new BehaviorSubject<any>([]);
    public role$ = this.roleSubject.asObservable();

    private roleLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.roleLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable()

    constructor(private roleManagerService: RoleManagerService) { }

    loadRoles(pageIndex: number, pageSize: number, filters): void {

        this.roleManagerService.GetListItemPaging(`Role/GetRoles?sorts=id&filters=${filters}&page=${pageIndex}&pageSize=${pageSize}`).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe((news: ServerResponse<TablePagingIndex<GetRoleModel>>) => {
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
