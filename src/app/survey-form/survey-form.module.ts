import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyFormComponent } from './survey-form.component';
import { SurveyFormRoutingModule } from './survey-form-routing.module';
import { AcademicFormComponent } from './academic-from/academic-form.component';
import { CareerFormComponent } from './career-form/career-form.component';
import { CareerInterestFormComponent } from './career-interest/career-interest-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ObserverFormComponent } from './observer-form/observer-form.component';

@NgModule({
  declarations: [
    SurveyFormComponent,
    AcademicFormComponent,
    CareerFormComponent,
    CareerInterestFormComponent,
    ProfileFormComponent,
    ObserverFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SurveyFormRoutingModule,
  ],
})
export class SurveyFormModule {}
