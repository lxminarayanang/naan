import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentSurveyFormComponent } from './student-survey-form.component';

const routes: Routes = [
  {
    path: '',
    component: StudentSurveyFormComponent,
  },
  {
    path: 'academic',
    component: StudentSurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'profile',
    component: StudentSurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'career-interest',
    component: StudentSurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'observer',
    component: StudentSurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'career',
    component: StudentSurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  // {
  //   path: 'academic',
  //   component: AcademicFormComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentSurveyFormRoutingModule {}
