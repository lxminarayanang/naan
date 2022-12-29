import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/services/common/language.service';
declare var $: any;

@Component({
  selector: 'app-academic-form',
  templateUrl: './academic-form.component.html',
  styleUrls: ['./academic-form.component.scss'],
})
export class AcademicFormComponent implements OnInit {
  public userDetails: any = {};
  public profileEditData: any;
  public submitted: boolean = false;

  academicInfoForm: any = this._formBuilder.group({
    mostIntrestedSubject: [''],
    leastInterestedSubject: [''],
    most_liked_subject1: ['', Validators.required],
    most_liked_subject2: ['', Validators.required],
    most_liked_subject3: ['', Validators.required],
    least_liked_subject1: ['', Validators.required],
    least_liked_subject2: ['', Validators.required],
    least_liked_subject3: ['', Validators.required],
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
    this.userDetails = JSON.parse(
      localStorage.getItem('userDetails') as string
    );
    this.profileEditData = JSON.parse(
      localStorage.getItem('academicFormValue') as string
    );
    if (this.userDetails) {
      this.academicInfoForm.patchValue({
        school: this.userDetails.school_name,
      });
    }
    if (this.profileEditData) {
      this.academicInfoForm.patchValue({
        mostIntrestedSubject: this.profileEditData.mostIntrestedSubject,
        leastInterestedSubject: this.profileEditData.leastInterestedSubject,
        most_liked_subject1: this.profileEditData.most_liked_subject1,
        most_liked_subject2: this.profileEditData.most_liked_subject2,
        most_liked_subject3: this.profileEditData.most_liked_subject3,
        least_liked_subject1: this.profileEditData.least_liked_subject1,
        least_liked_subject2: this.profileEditData.least_liked_subject2,
        least_liked_subject3: this.profileEditData.least_liked_subject3,
      });
    }
  }

  public onClickNext(): void {
    this.submitted = true;
    if(this.academicInfoForm.invalid){
      for (const key of Object.keys(this.academicInfoForm.controls)) {
        if (this.academicInfoForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
  else{
    localStorage.setItem(
      'academicFormValue',
      JSON.stringify(this.academicInfoForm.value)
    );
    //this._router.navigate[('')]
    this._router.navigate(['/student/career']);

  }

  }
  public onClickBack(): void {
    this._router.navigate(['/student/profile']);
  }
}
