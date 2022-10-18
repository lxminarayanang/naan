import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentSurveyFormRoutingModule } from './student-survey-detail-routing.module';
import { AcademicFormComponent } from './academic-from/academic-form.component';
import { CareerFormComponent } from './career-form/career-form.component';
import { StudentSurveyProfileFormComponent } from './profile-form/student-survey-profile-form.component';
import { StudentSurveyDetailComponent } from './student-survey-detail.component';
import { UniquePipe } from '../shared/pipe/unique.pipe';

@NgModule({
  declarations: [
    AcademicFormComponent,
    CareerFormComponent,
    StudentSurveyProfileFormComponent,
    StudentSurveyDetailComponent,
    UniquePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StudentSurveyFormRoutingModule,
  ],
})
export class StudentSurveyFormModule {}
