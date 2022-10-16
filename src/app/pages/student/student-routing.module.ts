import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
  },
  {
    path: 'profile',
    component: StudentComponent,
    data: {
      breadcrumb: 'profile',
    },
  },
  {
    path: 'survey-report',
    component: StudentComponent,
    data: {
      breadcrumb: 'survey-report',
    },
  },
  {
    path: 'survey-assessment',
    component: StudentComponent,
    data: {
      breadcrumb: 'survey-assessment',
    },
  },
  {
    path: 'student-academic',
    component: StudentComponent,
    data: {
      breadcrumb: 'student-academic',
    },
  },
  {
    path: 'student-group',
    component: StudentComponent,
    data: {
      breadcrumb: 'student-group',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDetailRoutingModule {}
