import { Component, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { LanguageService } from '../../shared/services/common/language.service';

@Component({
  selector: 'app-observer-form',
  templateUrl: './observer-form.component.html',
  styleUrls: ['./observer-form.component.scss'],
})
export class ObserverFormComponent implements OnInit {
 public submitted:boolean=false;
  public preferedJobValue: string = '';
  public userDetails: any = {};
  public profileEditData: any;

  observerForm = this._formBuilder.group({
    scholorshipExams:[],
    nmms:['', Validators.required],
//trust:['', Validators.required],
ntse:['', Validators.required],
yasavi:['', Validators.required],
tamil_talent_test:['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.profileEditData = JSON.parse(
      localStorage.getItem('observerFormValue') as string
    );

    if (this.profileEditData) {
      this.observerForm.patchValue({
        scholorshipExams: this.profileEditData.scholorshipExams,
        nmms:this.profileEditData.nmms,
        //trust:this.profileEditData.scholorshipExams,
        ntse:this.profileEditData.ntse,
        yasavi:this.profileEditData.yasavi,
        tamil_talent_test:this.profileEditData.tamil_talent_test,
      });
    }
  }

  public onClickNext(): void {
    this.submitted = true;
    if(this.observerForm.invalid){
      for (const key of Object.keys(this.observerForm.controls)) {
        if (this.observerForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
   else {
      localStorage.setItem(
        'observerFormValue',
        JSON.stringify(this.observerForm.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/career-interest']);
    }
  }

  toBack() {
    this._router.navigate(['/home']);
  }
  public onClickBack(): void {
    this._router.navigate(['/student/certificate']);
  }
}
