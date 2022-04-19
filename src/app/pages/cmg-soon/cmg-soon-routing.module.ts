import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmgSoonComponent } from './cmg-soon.component';

const routes: Routes = [
  {
    path: "",
    component: CmgSoonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmgSoonRoutingModule { }
