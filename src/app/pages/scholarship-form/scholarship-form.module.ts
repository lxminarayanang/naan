import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScholarshipFormRoutingModule } from './scholarship-form-routing.module';
import { ScholarshipFormComponent } from './scholarship-form.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ScholarshipFormComponent
  ],
  imports: [
    CommonModule,
    ScholarshipFormRoutingModule,
    SharedModule
  ]
})
export class ScholarshipFormModule { }
