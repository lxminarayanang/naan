import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsarFormRoutingModule } from './sponsar-form-routing.module';
import { SponsarFormComponent } from './sponsar-form.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SponsarFormComponent
  ],
  imports: [
    CommonModule,
    SponsarFormRoutingModule,
    SharedModule
  ]
})
export class SponsarFormModule { }
