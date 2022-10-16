import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "categories/:id/:name/list",
        loadChildren: () => import('./exams-list/exams-list.module').then(m => m.ExamsListModule),
      },
      {
        path: "categories/:id1/list/:id2",
        loadChildren: () => import('./exams-overview/exams-overview.module').then(m => m.ExamsOverviewModule),
      },
      {
        path: "categories/:id1",
        loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule),
      },
      {
        path: "coming-soon",
        loadChildren: () => import('./cmg-soon/cmg-soon.module').then(m => m.CmgSoonModule),
      },
      {
        path: "assessment",
        loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule),
      },
      {
        path: "loans",
        loadChildren: () => import('./loans/loans.module').then(m => m.LoansModule),
      },
      {
        path: "assessment/:id",
        loadChildren: () => import('./assessment-result/assessment-result.module').then(m => m.AssessmentResultModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
