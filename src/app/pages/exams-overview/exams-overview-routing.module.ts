import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsOverviewComponent } from './exams-overview.component';

const routes: Routes = [
  {
    path: "",
    component: ExamsOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsOverviewRoutingModule { }
