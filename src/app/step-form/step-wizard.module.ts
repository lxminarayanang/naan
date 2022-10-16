import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepWizardComponent } from './step-wizard.component';
import { StepWiardRoutingModule } from './step-wizard-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StepWizardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StepWiardRoutingModule,
  ],
})
export class StepWizardModule {}
