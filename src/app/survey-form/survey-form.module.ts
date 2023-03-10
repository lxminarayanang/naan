import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyFormComponent } from './survey-form.component';
import { SurveyFormRoutingModule } from './survey-form-routing.module';
import { AcademicFormComponent } from './academic-from/academic-form.component';
import { CareerFormComponent } from './career-form/career-form.component';
import { CareerInterestFormComponent } from './career-interest/career-interest-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ObserverFormComponent } from './observer-form/observer-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { ExcelService } from './survey-list/exel-service';
import { CertificateFormComponent } from './certificate/certificate-form.component';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { ExamsFormComponent } from './exams-form/exams-form.component';
import { SpecializationFormComponent } from './specialization/specialization.component';
import { CareerGuidanceFormComponent } from './Career-Guidance/career-guidance-form.component';

@NgModule({
  declarations: [
    SurveyFormComponent,
    AcademicFormComponent,
    CareerFormComponent,
    CareerInterestFormComponent,
    ProfileFormComponent,
    ObserverFormComponent,
    SurveyListComponent,
    CertificateFormComponent,
    CoursesFormComponent,
    ExamsFormComponent,
    SpecializationFormComponent,
    CareerGuidanceFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SurveyFormRoutingModule,
  ],
  providers:[
    ExcelService,
    DatePipe
  ]
})
export class SurveyFormModule {}
