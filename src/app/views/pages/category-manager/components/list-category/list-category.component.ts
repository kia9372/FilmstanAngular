import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryDateSource } from '../../services/category-dataSource';
import { GetAllCategoryModel } from '../../models/GetAllCategoryModel';
import { CategoryManagerService } from '../../services/category-manager-service';
import { IAppConfig, APP_CONFIG } from '@app/core/config';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { DeleteEntityDialogComponent } from '@app/views/partials/content/crud';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'kt-list-category',
    templateUrl: './list-category.component.html',
    styleUrls: ['./list-category.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ListCategoryComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    columnsToDisplay = ['name', 'actions'];
    dataSource: CategoryDateSource;
    pageSize: number;
    pageSizeOptions: number[];
    sortedData: GetAllCategoryModel[] = [];
    seedData: GetAllCategoryModel[] = [];
    filters: string;

    constructor(private countryManagerService: CategoryManagerService
        , @Inject(APP_CONFIG) private appConfig: IAppConfig
        , public dialog: MatDialog
        , private cdRef: ChangeDetectorRef) {
        // this.fetchData();
    }
    ngAfterViewInit(): void {

        this.cdRef.detectChanges();
    }

    isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
    expandedElement: any;

    ngOnInit(): void {
        this.pageSize = this.appConfig.tablePageSize;
        this.pageSizeOptions = this.appConfig.tablePageSizeOptions;
        this.dataSourceInit();
        this.initPaginator();
        this.applyFilter();
    }
    private loadDataSource(): void {
        this.dataSource.loadCategory(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            this.filters
        );
    }
    dataSourceInit(): void {
        this.dataSource = new CategoryDateSource(this.countryManagerService);
        this.dataSource.loadCategory(1, this.pageSize, this.filters);
    }
    CheckBoolean(value): boolean {
        if (typeof (value) === 'boolean')
            return true;
        return false;
    }

    initPaginator(): void {
        this.paginator.page.pipe(tap(() => this.loadDataSource())).subscribe();
    }

    applyFilter(): void {
        this.paginator.pageIndex = 0;
        this.countryManagerService.filter$
            .pipe()
            .subscribe(filters => {
                this.filters = filters;
                this.paginator.pageIndex = 0;
                this.loadDataSource();
            });
    }

    delete(id: number): void {
        const title = 'Post Delete';
        const itemName = `Post `;
        const service = this.countryManagerService;

        const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
            data: { id, title, itemName, service, url: '/role/delelte' },
            width: '440px'
        });

        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.loadDataSource();
            }
        });
    }

    sortData(sort: Sort) {

        this.dataSource.role$.subscribe(x => {
            this.seedData = x
        })
        const data = this.seedData.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }
        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'name': return compare(a.name, b.name, isAsc);
                default: return 0;
            }
        });
        this.dataSource.roleSubject.next(data);
    }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

