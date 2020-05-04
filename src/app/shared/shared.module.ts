import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material.module';
import { LogHelper } from './services';
import { DateToPersian } from './pipes/date-to-persian.pipe';
import { EnumToArrayPipe } from './pipes/EnumToArrayPipe';
import { DetailDialogComponent } from './components/detail-dialog/detail-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NG_VALIDATORS, ReactiveFormsModule } from '@angular/forms';
import { DateService } from './services/date.service';
import { UserFieldComponent } from './components/user-field/user-field.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ConvertbytePipe } from './pipes/convertbyte.pipe';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { MonySplitePipe } from './pipes/mony-splite.pipe';
import { ShowImageInListComponent } from './components/show-image-ln-list/show-image-in-list.component';
import { SearchableDropdownComponent } from './components/searchable-dropdown/searchable-dropdown/searchable-dropdown.component';
import { SearchWtihInput } from './pipes/saerch-with-input-pipe';
import { ArraySortPipe } from './pipes/sort-pipe';
import { DateTimeFormatComponent } from './components/date-time-format/date-time-format.component';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { IsEllipsisActiveDirective } from './directives/is-ellipsis-active.directive';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './services/material.persian-date.adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatetimepickerModule, MatNativeDatetimeModule, MAT_DATETIME_FORMATS } from "@mat-datetimepicker/core";
import { CloseDatePcikerDirective } from './directives/close-date-pciker.directive';
import { DiffFinderComponent } from './components/diff-finder/diff-finder.component';
import { PrettyShowJson } from './pipes/pretty-json';
import { TreeRolesComponent } from './components/tree-roles/components/tree-roles.component';


@NgModule({
    declarations: [
        DateToPersian
        , EnumToArrayPipe
        , DetailDialogComponent
        , SearchWtihInput
        , PreviewComponent
        , ConvertbytePipe
        , UserFieldComponent
        , ArraySortPipe
        , MonySplitePipe
        , ShowImageInListComponent
        , SearchableDropdownComponent
        , DateTimeFormatComponent
        , CheckBoxComponent
        , IsEllipsisActiveDirective
        , CloseDatePcikerDirective
        , DiffFinderComponent
        , PrettyShowJson
        , TreeRolesComponent

    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        FormsModule,
        MaterialFileInputModule,
        MatDatepickerModule,
        // use this if you want to use native javascript dates and INTL API if available
        // MatNativeDatetimeModule,
        MatDatepickerModule,
        MatNativeDatetimeModule,
        MatDatetimepickerModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        DpDatePickerModule,
        TranslateModule.forChild()
    ],
    providers: [LogHelper
        , DateService
        , {
            provide: DateAdapter, useClass: MaterialPersianDateAdapter
            , deps: [MAT_DATE_LOCALE]
        }
        , { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }

    ],
    exports: [
        MaterialModule
        , ConvertbytePipe
        , DateToPersian
        , EnumToArrayPipe
        , DetailDialogComponent
        , PreviewComponent
        , UserFieldComponent
        , SearchableDropdownComponent
        , SearchWtihInput
        , ShowImageInListComponent
        , MonySplitePipe
        , ArraySortPipe
        , DateTimeFormatComponent
        , CheckBoxComponent
        , IsEllipsisActiveDirective
        , CloseDatePcikerDirective
        , DiffFinderComponent
        , PrettyShowJson
        , TreeRolesComponent
    ],
    entryComponents: [DetailDialogComponent, DiffFinderComponent, PreviewComponent]
})
export class SharedModule { }
