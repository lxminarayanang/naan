import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScholarshipFormComponent } from './scholarship-form.component';

const routes: Routes = [{
  path: "",
  component: ScholarshipFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScholarshipFormRoutingModule { }
