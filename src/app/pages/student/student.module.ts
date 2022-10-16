import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student.component';
import { StudentDetailRoutingModule } from './student-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { StudentProfileComponent } from './detail/student-profile/student-profile.component';
import { SurveyReportComponent } from './detail/survey-report/survey-report.component';
import { SurveyAssessmentComponent } from './detail/survey-assessment/survey-assessment.component';
import { StudentAcademicComponent } from './detail/student-academic/student-academic.component';
import { StudentGroupComponent } from './detail/student-group/student-group.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentProfileComponent,
    SurveyReportComponent,
    SurveyAssessmentComponent,
    StudentAcademicComponent,
    StudentGroupComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    StudentDetailRoutingModule,
  ],
})
export class StudentDetailModule {}
