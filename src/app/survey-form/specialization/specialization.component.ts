import { Component, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { LanguageService } from '../../shared/services/common/language.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.scss'],
})
export class SpecializationFormComponent implements OnInit {
 public submitted:boolean=false;
  public preferedJobValue: string = '';
  public userDetails: any = {};
  public profileEditData: any;
  public specilaztions: any[] = [];
  public language:string;

  specilizationForm = this._formBuilder.group({
    specialization1:['', Validators.required],
    specialization2:['', Validators.required],
    specialization3:['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    private httpClient:HttpClient,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.language=localStorage.getItem('language') as string;
    this._getSpecialization();
    this.profileEditData = JSON.parse(
      localStorage.getItem('specilizationFormValue') as string
    );

    if (this.profileEditData) {
      this.specilizationForm.patchValue({
        specialization1:this.profileEditData.specialization1,
        specialization2:this.profileEditData.specialization2,
        specialization3:this.profileEditData.specialization3,
      });
    }
  }

  public toClose(): void {
    $('#alertModal').modal('close');
  }

  public onClickNext(): void {
    this.submitted = true;
    if(this.specilizationForm.invalid){
      for (const key of Object.keys(this.specilizationForm.controls)) {
        if (this.specilizationForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
   else {
      localStorage.setItem(
        'specilizationFormValue',
        JSON.stringify(this.specilizationForm.value)
      );
      //this._router.navigate[('')]
       this._router.navigate(['/student/exams']);
    }
  }

  toBack() {
    this._router.navigate(['/home']);
  }
  public onClickBack(): void {
    this._router.navigate(['/student/career']);
  }
  private _getSpecialization(): void {
    debugger
    if(this.language==="tamil"){
      this.httpClient.get<any>("assets/survey-json/specialization-tm.json").subscribe((res)=>{
        if (res.status == 200) {
          this.specilaztions = res.results;
        }
      });
    }
    else{
      this.httpClient.get<any>("assets/survey-json/specialization-en.json").subscribe((res)=>{
        if (res.status == 200) {
          this.specilaztions = res.results;
        }
      });
    }


  }
}
