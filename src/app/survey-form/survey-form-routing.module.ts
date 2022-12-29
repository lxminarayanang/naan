import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyFormComponent } from './survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyFormComponent,
  },
  // {
  //   path: 'academic',
  //   component: SurveyFormComponent,
  //   data: {
  //     breadcrumb: 'academic',
  //   },
  // },
  {
    path: 'profile',
    component: SurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'career-interest',
    component: SurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'observer',
    component: SurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'career',
    component: SurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'specialization',
    component: SurveyFormComponent,
    data: {
      breadcrumb: 'specialization',
    },
  },
  // {
  //   path: 'courses',
  //   component: SurveyFormComponent,
  //   data: {
  //     breadcrumb: 'courses',
  //   },
  // },
  {
    path: 'exams',
    component: SurveyFormComponent,
    data: {
      breadcrumb: 'exams',
    },
  },
  {
    path: 'career-guidance',
    component: SurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'certificate',
    component: SurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
  {
    path: 'list',
    component: SurveyListComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyFormRoutingModule {}
