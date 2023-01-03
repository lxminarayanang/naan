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
  selector: 'app-exams-form',
  templateUrl: './exams-form.component.html',
  styleUrls: ['./exams-form.component.scss'],
})
export class ExamsFormComponent implements OnInit {
 public submitted:boolean=false;
  public preferedJobValue: string = '';
  public userDetails: any = {};
  public profileEditData: any;
  public examFileteredData:any=[];
  public specilaztionsArr:any = []
  public exams:any;
  public language:string;

  examForm = this._formBuilder.group({
exams1:['', Validators.required],
exams2:['', Validators.required],
exams3:['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,

    private _commonService: CommonService,
    private _location: Location,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef,
    private httpClient:HttpClient,
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.language=localStorage.getItem('language') as string;
    this._getExams();
    this.profileEditData = JSON.parse(
      localStorage.getItem('examFormValue') as string
    );

    if (this.profileEditData) {
      this.examForm.patchValue({
        exams1:this.profileEditData.exams1,
        exams2:this.profileEditData.exams2,
        exams3:this.profileEditData.exams3,
      });
    }
  }

  public toClose(): void {
    $('#alertModal').modal('close');
  }

  public onClickNext(): void {
    this.submitted = true;
    if(this.examForm.invalid){
      for (const key of Object.keys(this.examForm.controls)) {
        if (this.examForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
   else {
      localStorage.setItem(
        'examFormValue',
        JSON.stringify(this.examForm.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/career']);
    }
  }

  toBack() {
    this._router.navigate(['/home']);
  }
  public onClickBack(): void {
    this._router.navigate(['/student/specialization']);
  }
  private _getExams(): void {
    if(this.language==="tamil"){
      this.httpClient.get<any>("assets/survey-json/exams-tm.json").subscribe((res:any)=>{
        if (res.status == 200) {
          this.exams = res.results;
          this.exams.forEach((item: any) => {
            if (item.name) {
              this.examFileteredData.push(item.name);
              //this.entranceExamData.push(item.admissionProcedure);

            }
          });
          this.examFileteredData=Array.from(new Set(this.examFileteredData));
          //  this.getExamDataBasedOnSpcl(res.results)
        }
      });
    }
    else{
      this.httpClient.get<any>("assets/survey-json/exams-en.json").subscribe((res:any)=>{
        if (res.status == 200) {
          this.exams = res.results;
          this.exams.forEach((item: any) => {
            if (item.name) {
              this.examFileteredData.push(item.name);
              //this.entranceExamData.push(item.admissionProcedure);

            }
          });
          this.examFileteredData=Array.from(new Set(this.examFileteredData));
          //  this.getExamDataBasedOnSpcl(res.results)
        }
      });
    }

}
}
