import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { LayoutModule } from '@core/layout/layout.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    CarouselModule.forRoot(),
    LandingPageRoutingModule,
  ]
})
export class LandingPageModule { }
