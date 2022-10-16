import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { LayoutModule } from '@core/layout/layout.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
    CarouselModule.forRoot(),
    LandingPageRoutingModule,
  ]
})
export class LandingPageModule { }
