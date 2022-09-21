import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
//import material-design
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, FormsModule, MatTableModule, ReactiveFormsModule, MatIconModule],
    exports: [CommonModule, FormsModule, MatTableModule, ReactiveFormsModule,MatIconModule],
})
export class SharedModule {}
