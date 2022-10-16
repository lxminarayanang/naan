import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentSurveyDetailComponent } from './student-survey-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StudentSurveyDetailComponent,
  },
  {
    path: 'alumni2022',
    component: StudentSurveyDetailComponent,
    data: {
      breadcrumb: 'alumni2022',
    },
  },
  {
    path: 'profile',
    component: StudentSurveyDetailComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'solution-provided',
    component: StudentSurveyDetailComponent,
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
