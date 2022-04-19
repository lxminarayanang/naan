import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {


  @Output() selectedOptions = new EventEmitter(); // Emit the selected List as Array
  @Output() clear = new EventEmitter(); // Emit the selected List as Array
  @Input() isMultiselect: boolean = false;   // for specify Single or Multiselect
  @Input() search : boolean = false;
  
  // Branchlist for specific component
  @Input() set masterList(value : any) {
    this.listItems = _.cloneDeep(value);    
    if(this.isMultiselect && this.fieldselectAll){
      this.listItems?.forEach((obj:any)=>{
        obj["all"] = "Select All";
      });
    }
  }  
  // Default selected Items         
  @Input() set selectedItems(value : any) {
    this.multiSelectedItems = value;
  }       
  // Default selected item key
  @Input() set key(value : any)  {
    this.fieldKey = value;
  }       
  // Display Name for the  List
  @Input() set displayName(value : any) {
    this.printName = value;    
  }      

  @Input() set disabled(value : any) {
    this.fieldDisabled = value;
  } 

  @Input() set selectAll(value : any) {
    this.fieldselectAll = value;
  }   

  @Input() set inputId(value : any){
    this.randomId = value;
  }

  @Input() listMode : boolean = false; // For showing the apply filter button
  @Input() closeMode : boolean = false; // For showing the apply filter button
  @Input() multiPlaceholder : string = "Select Items"

  fieldselectAll : boolean = false;
  multiSelectedItems : any = [];
  listItems : any = [];
  fieldKey : any = [];
  printName : any = [];
  fieldDisabled : boolean = false;
  randomId : number = 0;
  
  constructor() { }

  ngOnInit(): void { }

   get selectedItems() : any {
     return this.multiSelectedItems;
   }
   get masterList() : any {
     return this.listItems;
   }
   get key() : any {
     return this.fieldKey;
   }
   get displayName() : any {
     return this.printName;
   }
   get disabled() : any {
     return this.fieldDisabled;
   }
   get selectAll() : any {
     return this.fieldselectAll;
   }
   get inputId(): any{
     return this.randomId;
   }
  // Selection Event for Both Single and Multiselect

  selectItems(){
    this.selectedOptions.emit(this.isMultiselect ? this.multiSelectedItems : [this.multiSelectedItems]); // Emit the output array to the parent component
    // Close the Container for single select
    if (!this.isMultiselect) {
      let parentElement = document.getElementById(`${this.printName}-${this.fieldKey}-${this.randomId}`)!;
      let selectField = parentElement.getElementsByClassName('ng-arrow-wrapper')[0];
      selectField.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    }
    // Only close the multiselect container for list view Multiselect
    if(this.listMode && this.isMultiselect){
      let parentElement = document.getElementById(`${this.printName}-${this.fieldKey}-${this.randomId}`)!;
      let selectField = parentElement.getElementsByClassName('ng-arrow-wrapper')[0];
      selectField.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    }  
  }

  // Clear All selections

  clearAll(){
    this.multiSelectedItems = [];
    if(!this.listMode) this.selectItems();
    this.clear.emit([])
  }

  closeDropdown(){
  
    // Only close the multiselect container for list view Multiselect
    if(this.closeMode && this.isMultiselect){
      let parentElement = document.getElementById(`${this.printName}-${this.fieldKey}-${this.randomId}`)!;
      let selectField = parentElement.getElementsByClassName('ng-arrow-wrapper')[0];
      selectField.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    }
  }

}
