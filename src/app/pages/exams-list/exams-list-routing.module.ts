import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsListComponent } from './exams-list.component';

const routes: Routes = [
  {
    path: "",
    component: ExamsListComponent,
    children: [
      {
        path: "/:id",
        loadChildren: () => import('../exams-overview/exams-overview.module').then(m => m.ExamsOverviewModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsListRoutingModule { }
