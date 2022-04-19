import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentResultComponent } from './assessment-result.component';

const routes: Routes = [
  {
    path: "",
    component: AssessmentResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentResultRoutingModule { }
