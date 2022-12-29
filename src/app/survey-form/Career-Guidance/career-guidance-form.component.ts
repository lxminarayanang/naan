import { Component, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { LanguageService } from '../../shared/services/common/language.service';
declare var $: any;

@Component({
  selector: 'app-career-guidance-form',
  templateUrl: './career-guidance-form.component.html',
  styleUrls: ['./career-guidance-form.component.scss'],
})
export class CareerGuidanceFormComponent implements OnInit {
  public userDetails: any = {};
  public profileEditData: any;
  public submitted: boolean = false;
  carrerGuidanceForm: any = this._formBuilder.group({
career_guidance:['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    private _commonService: CommonService,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.profileEditData = JSON.parse(
      localStorage.getItem('careerGuidanceFormValue') as string
    );

    if (this.profileEditData) {
      this.carrerGuidanceForm.patchValue({
        career_guidance: this.profileEditData.career_guidance,
      });
    }
  }

  public toClose(): void {
    this._router.navigate(['/student/profile']);
    localStorage.removeItem('profileFormValue');
    localStorage.removeItem('careerFormValue');
    localStorage.removeItem('careerInterestValue');
    localStorage.removeItem('observerFormValue');
    localStorage.removeItem('certificateFormValue');
    localStorage.removeItem('examFormValue');
    localStorage.removeItem('specilizationFormValue');
    localStorage.removeItem('careerGuidanceFormValue');
    //$('#alertModal').modal('close');

  }

  toBack() {
    this._router.navigate(['/student/profile']);
  }

  public onClickBack(): void {
    this._router.navigate(['/student/career-interest']);
  }


  public onClickFormSubmit(): void {
   const payload=this._mapPayload();
      this._commonService
        .postService('/one-to-one-assesement/add', payload)
        .subscribe((res:any) => {
          debugger;
          if (res.status == 200) {
            $('#successModal').modal('show');
            localStorage.removeItem('profileFormValue');
            localStorage.removeItem('careerFormValue');
            localStorage.removeItem('careerInterestValue');
            localStorage.removeItem('observerFormValue');
            localStorage.removeItem('certificateFormValue');
            localStorage.removeItem('examFormValue');
            localStorage.removeItem('specilizationFormValue');
            localStorage.removeItem('careerGuidanceFormValue');
          }
          else if(res.status == 405){
            $('#alertModal').modal('show');
          }
        },
        (err:Error) => {

          console.log(err)
        }
        );
  }

  _mapPayload(){
    const {career_guidance}=this.carrerGuidanceForm.value

    const profileData = JSON.parse(
      localStorage.getItem('profileFormValue') as any
    );
    // const academicFormValue = JSON.parse(
    //   localStorage.getItem('academicFormValue') as any
    // );

    const careerFormValue = JSON.parse(
      localStorage.getItem('careerFormValue') as any
    );
    const careerInterestFormValue = JSON.parse(
      localStorage.getItem('careerInterestValue') as any
    );
    const certificateFormValue = JSON.parse(
      localStorage.getItem('certificateFormValue') as any
    );
    // const coursesFormValue = JSON.parse(
    //   localStorage.getItem('coursesFormValue') as any
    // );
    const observerFormValue = JSON.parse(
      localStorage.getItem('observerFormValue') as any
    );
    const examFormValue = JSON.parse(
      localStorage.getItem('examFormValue') as any
    );
    const specilizationFormValue = JSON.parse(
      localStorage.getItem('specilizationFormValue') as any
    );

    const payload = {
      ...profileData,
      ...careerFormValue,
      ...observerFormValue,
      ...careerInterestFormValue,
      ...certificateFormValue,
      ...examFormValue,
      ...specilizationFormValue,
      career_guidance


    };

    return payload;
  }

}
