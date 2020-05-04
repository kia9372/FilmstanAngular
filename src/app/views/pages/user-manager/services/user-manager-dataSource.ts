import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { UserManagerService } from './user-manager-service';
import { catchError, finalize } from 'rxjs/operators';
import { ServerResponse, TablePagingIndex } from '@app/core/models';

@Injectable({
    providedIn: 'root'
})
export class UserDateSource implements DataSource<any>{

    public userSubject = new BehaviorSubject<any>([]);
    public user$ = this.userSubject.asObservable();

    private userLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.userLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable()

    constructor(private userManagerService: UserManagerService) { }

    loadUsers(pageIndex: number, pageSize: number, filters): void {

        this.userManagerService.GetListItemPaging(`User/GetAllUserPaging?sorts=id&filters=${filters}&page=${pageIndex}&pageSize=${pageSize}`).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe((news: ServerResponse<TablePagingIndex<any>>) => {
                const data = news.data.records;
                this.userLengthSource.next(news.data.totalCount);
                this.userSubject.next(data);
            });
    }

    connect(): Observable<any> {
        return this.userSubject.asObservable();
    }

    disconnect(): void {
        this.userSubject.complete();
        this.loadingSubject.complete();
    }

}
