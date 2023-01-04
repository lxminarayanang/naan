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
  selector: 'app-certificate-form',
  templateUrl: './certificate-form.component.html',
  styleUrls: ['./certificate-form.component.scss'],
})
export class CertificateFormComponent implements OnInit {
 public submitted:boolean=false;
  public preferedJobValue: string = '';
  public userDetails: any = {};
  public profileEditData: any;

  certificateForm = this._formBuilder.group({
    sslc_mark_sheet:['', Validators.required],
    hse_plus_one__mark_sheet:['', Validators.required],
    transfer_certificate:['', Validators.required],
    community_certificate:['', Validators.required],
    aadhaar_card:['', Validators.required],
    income_certificate:['', Validators.required],
    sports_certificate:['', Validators.required],
    nativity_certificate:['', Validators.required],
    ex_service_certificate:['', Validators.required],
    refugee_certificate:['', Validators.required],
    first_graduate_certificate:['', Validators.required],
    differently_abled_certificate:['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef,
    private _commonService: CommonService
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.profileEditData = JSON.parse(
      localStorage.getItem('certificateFormValue') as string
    );

    if (this.profileEditData) {
      this.certificateForm.patchValue({
    sslc_mark_sheet:this.profileEditData.sslc_mark_sheet,
    hse_plus_one__mark_sheet:this.profileEditData.hse_plus_one__mark_sheet,
    transfer_certificate:this.profileEditData.transfer_certificate,
    community_certificate:this.profileEditData.community_certificate,
    aadhaar_card:this.profileEditData.aadhaar_card,
    income_certificate:this.profileEditData.income_certificate,
    sports_certificate:this.profileEditData.sports_certificate,
    nativity_certificate:this.profileEditData.nativity_certificate,
    ex_service_certificate:this.profileEditData.ex_service_certificate,
    refugee_certificate:this.profileEditData.refugee_certificate,
    first_graduate_certificate:this.profileEditData.first_graduate_certificate,
    differently_abled_certificate:this.profileEditData.differently_abled_certificate,
      });
    }
  }

  public onClickNext(): void {
    this.submitted = true;
    if(this.certificateForm.invalid){
      for (const key of Object.keys(this.certificateForm.controls)) {
        if (this.certificateForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
   else {
      localStorage.setItem(
        'certificateFormValue',
        JSON.stringify(this.certificateForm.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/observer']);
    }
  }

  public toClose(): void {
    this._router.navigate(['/student/profile']);
    localStorage.removeItem('profileFormValue');
    localStorage.removeItem('careerFormValue');
    localStorage.removeItem('certificateFormValue');
    localStorage.removeItem('examFormValue');
    localStorage.removeItem('specilizationFormValue');
    //$('#alertModal').modal('close');

  }


  public onClickFormSubmit(): void {
    this.submitted = true;
    if(this.certificateForm.invalid){
      for (const key of Object.keys(this.certificateForm.controls)) {
        if (this.certificateForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
  else{
    localStorage.setItem(
      'certificateFormValue',
      JSON.stringify(this.certificateForm.value)
    );
    const payload=this._mapPayload();
    this._commonService
      .postService('/one-to-one-assesement/add', payload)
      .subscribe((res:any) => {
        debugger;
        if (res.status == 200) {
          $('#successModal').modal('show');
          localStorage.removeItem('profileFormValue');
          localStorage.removeItem('careerFormValue');
          localStorage.removeItem('certificateFormValue');
          localStorage.removeItem('examFormValue');
          localStorage.removeItem('specilizationFormValue');
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

  }

  _mapPayload(){
    // const {career_guidance}=this.carrerGuidanceForm.value

    const profileData = JSON.parse(
      localStorage.getItem('profileFormValue') as any
    );
    // const academicFormValue = JSON.parse(
    //   localStorage.getItem('academicFormValue') as any
    // );

    const careerFormValue = JSON.parse(
      localStorage.getItem('careerFormValue') as any
    );
    // const careerInterestFormValue = JSON.parse(
    //   localStorage.getItem('careerInterestValue') as any
    // );
    const certificateFormValue = JSON.parse(
      localStorage.getItem('certificateFormValue') as any
    );
    // const coursesFormValue = JSON.parse(
    //   localStorage.getItem('coursesFormValue') as any
    // );
    // const observerFormValue = JSON.parse(
    //   localStorage.getItem('observerFormValue') as any
    // );
    const examFormValue = JSON.parse(
      localStorage.getItem('examFormValue') as any
    );
    const specilizationFormValue = JSON.parse(
      localStorage.getItem('specilizationFormValue') as any
    );

    const payload = {
      ...profileData,
      ...careerFormValue,
      ...certificateFormValue,
      ...examFormValue,
      ...specilizationFormValue,
     // career_guidance
     //...careerInterestFormValue
     //...observerFormValue,


    };

    return payload;
  }


  toBack() {
    this._router.navigate(['/home']);
  }
  public onClickBack(): void {
    this._router.navigate(['/student/career']);
  }
}
