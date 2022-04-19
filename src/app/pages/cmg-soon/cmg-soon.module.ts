import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmgSoonRoutingModule } from './cmg-soon-routing.module';
import { CmgSoonComponent } from './cmg-soon.component';


@NgModule({
  declarations: [
    CmgSoonComponent
  ],
  imports: [
    CommonModule,
    CmgSoonRoutingModule
  ]
})
export class CmgSoonModule { }
