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
  selector: 'app-career-interest-form',
  templateUrl: './career-interest-form.component.html',
  styleUrls: ['./career-interest-form.component.scss'],
})
export class CareerInterestFormComponent implements OnInit {
  public userDetails: any = {};
  careersData:any;
  public profileEditData: any;
  public submitted: boolean = false;

  carrerInfoForm: any = this._formBuilder.group({
    govtExams:[],
tnpsc_exam:['', Validators.required],
trb_exam:['', Validators.required],
tnusrb_exam:['', Validators.required],
ssc_exam:['', Validators.required],
upsc_exam:['', Validators.required],
rrb_exam:['', Validators.required],
ipbs_exam:['', Validators.required],
nda_exam:['', Validators.required],
cds_exam:['', Validators.required],
rbi_exam:['', Validators.required],
psu_exam:['', Validators.required],
    //interestedJobSector,
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    private _commonService: CommonService,
    private _location: Location,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this._getCareers();
    this.profileEditData = JSON.parse(
      localStorage.getItem('careerInterestValue') as string
    );

    if (this.profileEditData) {
      this.carrerInfoForm.patchValue({
        interestedJobSector: this.profileEditData.interestedJobSector,
        tnpsc_exam:this.profileEditData.tnpsc_exam,
        trb_exam:this.profileEditData.trb_exam,
        tnusrb_exam:this.profileEditData.tnusrb_exam,
        ssc_exam:this.profileEditData.ssc_exam,
        upsc_exam:this.profileEditData.upsc_exam,
        rrb_exam:this.profileEditData.rrb_exam,
        ipbs_exam:this.profileEditData.ipbs_exam,
        nda_exam:this.profileEditData.nda_exam,
        cds_exam:this.profileEditData.cds_exam,
        rbi_exam:this.profileEditData.rbi_exam,
        psu_exam:this.profileEditData.psu_exam,
      });
    }
  }

  toBack() {
    this._router.navigate(['/student/profile']);
  }

  private _getCareers(): void {
    this._commonService
      .getService(`/careers/filter?menu=field`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.careersData = res.results;
        }
      });
  }

  public onClickBack(): void {
    this._router.navigate(['/student/observer']);
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


  public onClickFormSubmit(): void {
    this.submitted = true;
    if(this.carrerInfoForm.invalid){
      for (const key of Object.keys(this.carrerInfoForm.controls)) {
        if (this.carrerInfoForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
  else{
    localStorage.setItem(
      'careerInterestValue',
      JSON.stringify(this.carrerInfoForm.value)
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
     // career_guidance


    };

    return payload;
  }



  public onClickNext(): void {
    this.submitted = true;
    if(this.carrerInfoForm.invalid){
      for (const key of Object.keys(this.carrerInfoForm.controls)) {
        if (this.carrerInfoForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
   else {
      localStorage.setItem(
        'careerInterestValue',
        JSON.stringify(this.carrerInfoForm.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/career-guidance']);
    }
  }

}
