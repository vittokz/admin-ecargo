import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import material-design
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { DataTableComponent } from './components/services/data-table/data-table.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        MatExpansionModule,
        MatTabsModule,
        MatCheckboxModule,
        MatMenuModule,
        NgApexchartsModule,
        MatRadioModule,
        MatSelectModule,
        MatDividerModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        MatSortModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        MatExpansionModule,
        MatTabsModule,
        DataTableComponent,
        MatCheckboxModule,
        MatMenuModule,
        NgApexchartsModule,
        MatRadioModule,
        MatSelectModule,
        MatDividerModule
    ],
    declarations: [
    DataTableComponent
  ],
})
export class SharedModule {}
