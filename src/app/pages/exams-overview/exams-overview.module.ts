import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamsOverviewRoutingModule } from './exams-overview-routing.module';
import { ExamsOverviewComponent } from './exams-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExamsOverviewComponent
  ],
  imports: [
    CommonModule,
    ExamsOverviewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExamsOverviewModule { }
