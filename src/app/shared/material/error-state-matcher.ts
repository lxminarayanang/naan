import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when control is invalid and form is submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {

  constructor(public formSubmitted: boolean) { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): any {

    return control && control?.invalid && ((form && form.submitted) || this.formSubmitted);
    
  }

}
