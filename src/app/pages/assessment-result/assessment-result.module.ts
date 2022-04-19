import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentResultRoutingModule } from './assessment-result-routing.module';
import { AssessmentResultComponent } from './assessment-result.component';


@NgModule({
  declarations: [
    AssessmentResultComponent
  ],
  imports: [
    CommonModule,
    AssessmentResultRoutingModule
  ]
})
export class AssessmentResultModule { }
