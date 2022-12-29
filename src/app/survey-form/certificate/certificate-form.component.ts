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
    hsc_plus_two_mark_sheet:['', Validators.required],
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
    private el: ElementRef
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.profileEditData = JSON.parse(
      localStorage.getItem('certificateFormValue') as string
    );

    if (this.profileEditData) {
      this.certificateForm.patchValue({
        sslcMarkSheet:this.profileEditData.sslcMarkSheet,
        higherMarkSheet:this.profileEditData.higherMarkSheet,
        hscMarkSheet:this.profileEditData.hscMarkSheet,
        transferCertificate:this.profileEditData.transferCertificate,
        CommunityCertificate:this.profileEditData.CommunityCertificate,
        aadharCard:this.profileEditData.aadharCard,
        incomeCertificate:this.profileEditData.incomeCertificate,
        sportsCertificates:this.profileEditData.sportsCertificates,
        nativityCertificate:this.profileEditData.nativityCertificate,
        militaryCertificate:this.profileEditData.militaryCertificate,
        tamilRefugee:this.profileEditData.tamilRefugee,
        firstGraduateCertificate:this.profileEditData.firstGraduateCertificate,
        differentlyAbledCertificate:this.profileEditData.differentlyAbledCertificate,
      });
    }
  }

  public toClose(): void {
    $('#alertModal').modal('close');
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

  toBack() {
    this._router.navigate(['/home']);
  }
  public onClickBack(): void {
    this._router.navigate(['/student/exams']);
  }
}
