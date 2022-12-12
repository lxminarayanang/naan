import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyFormComponent } from './survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyFormComponent,
  },
  {
    path: 'academic',
    component: SurveyFormComponent,
    data: {
      breadcrumb: 'academic',
    },
  },
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
    path: 'list',
    component: SurveyListComponent,
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
export class SurveyFormRoutingModule {}
