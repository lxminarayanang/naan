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
    govtExams:['', Validators.required],
    //interestedJobSector: ['', Validators.required],
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
      localStorage.getItem('careerInterestFormValue') as string
    );

    if (this.profileEditData) {
      this.carrerInfoForm.patchValue({
        interestedJobSector: this.profileEditData.interestedJobSector,
        govtExams: this.profileEditData.govtExams,
      });
    }
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
 else{
      localStorage.setItem(
        'careerInterestFormValue',
        JSON.stringify(this.carrerInfoForm.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/observer']);
    }
  }

  public toClose(): void {
    $('#alertModal').modal('close');
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


  public onClickFormSubmit(): void {
    const {govtExams,interestedJobSector}=this.carrerInfoForm.value
    const profileData = JSON.parse(
      localStorage.getItem('profileFormValue') as any
    );
    const academicFormValue = JSON.parse(
      localStorage.getItem('academicFormValue') as any
    );

    const careerFormValue = JSON.parse(
      localStorage.getItem('careerFormValue') as any
    );
    const observerFormValue = JSON.parse(
      localStorage.getItem('observerFormValue') as any
    );

    const payload = {
      ...profileData,
      ...academicFormValue,
      ...careerFormValue,
      ...observerFormValue
    };
    const {
    importantForEducation,
    challengesInHigherEducation,
    specilaztions,
    intrestedCourse,
    entranceExams,
    accessedGoverementSchemes,
    documentList,
    scholorshipExams,
    awareGovtSchemes,
    likedColleges,
    graduationAwayFromHometown,
    leastInterestedSubject,
    mostIntrestedSubject

    } = payload;

    const payloadUpdate = {
    ...profileData,
    mostIntrestedSubject: JSON.stringify(mostIntrestedSubject),
    leastInterestedSubject: JSON.stringify(leastInterestedSubject),
    importantForEducation,
    challengesInHigherEducation,
    specilaztions:JSON.stringify(specilaztions),
    intrestedCourse:JSON.stringify(intrestedCourse),
    entranceExams:JSON.stringify(entranceExams),
    accessedGoverementSchemes:JSON.stringify(accessedGoverementSchemes),
    documentList:JSON.stringify(documentList),
    scholorshipExams:JSON.stringify(scholorshipExams),
    awareGovtSchemes:JSON.stringify(awareGovtSchemes),
    likedColleges,
    graduationAwayFromHometown,
    interestedJobSector: JSON.stringify(interestedJobSector),
    govtExams: JSON.stringify(govtExams),

    };
    this._commonService
      .postService('/one-to-one-assesement/add', payloadUpdate)
      .subscribe((res: any) => {
        if (res.status == 200) {
          $('#successModal').modal('show');
          localStorage.removeItem('profileFormValue');
          localStorage.removeItem('academicFormValue');
          localStorage.removeItem('careerFormValue');
          localStorage.removeItem('careerInterestFormValue');
          localStorage.removeItem('observerFormValue');
        }
      });
  }

}
