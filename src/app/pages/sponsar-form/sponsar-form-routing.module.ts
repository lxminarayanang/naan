import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsarFormComponent } from './sponsar-form.component';

const routes: Routes = [
  {
    path:"",
    component:SponsarFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsarFormRoutingModule { }
