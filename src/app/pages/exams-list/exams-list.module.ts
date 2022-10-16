import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamsListRoutingModule } from './exams-list-routing.module';
import { ExamsListComponent } from './exams-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Examlist } from '@shared/model/examlist';
import { MaterialModule } from '@shared/material/material.module';



@NgModule({
  declarations: [
    ExamsListComponent,
  ],
  imports: [
    CommonModule,
    ExamsListRoutingModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MaterialModule
  ],
  providers : [Examlist]
})
export class ExamsListModule { }
