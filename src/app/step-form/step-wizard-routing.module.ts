import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepWizardComponent } from './step-wizard.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: StepWizardComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepWiardRoutingModule {}
