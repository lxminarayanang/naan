import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonToastrComponent, ConfirmationDialogComponent, MaintenanceComponent, ModalComponent, MultiSelectComponent, PageNotFoundComponent } from './components';
import { NumberDirective } from './directives/numbers-only.directive';
import { DecimalNumberDirective } from './directives/decimal-numbers-only.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation.service';

@NgModule({
  declarations: [
    MaintenanceComponent, 
    PageNotFoundComponent, 
    ConfirmationDialogComponent, 
    CommonToastrComponent, 
    MultiSelectComponent,
    NumberDirective,
    DecimalNumberDirective,
    ModalComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbTooltipModule,
    MaterialModule,    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaintenanceComponent, 
    PageNotFoundComponent,
    MultiSelectComponent,
    NgbTooltipModule,
    MaterialModule,
    NumberDirective,
    DecimalNumberDirective,
    ModalComponent,
  ],
  providers:[
    ConfirmationDialogService
  ],
  entryComponents:[ConfirmationDialogComponent]  
})
export class SharedModule { }
