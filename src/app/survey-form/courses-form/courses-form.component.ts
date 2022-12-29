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
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
})
export class CoursesFormComponent implements OnInit {
 public submitted:boolean=false;
  public preferedJobValue: string = '';
  public userDetails: any = {};
  public profileEditData: any;
  public coursesData: any[] = [];
  public language:string;

  cousesForm = this._formBuilder.group({
courses1:['', Validators.required],
courses2:['', Validators.required],
courses3:['', Validators.required],
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
    this._getCoursesList();
    this.profileEditData = JSON.parse(
      localStorage.getItem('coursesFormValue') as string
    );

    if (this.profileEditData) {
      this.cousesForm.patchValue({
        courses1:this.profileEditData.courses1,
        courses2:this.profileEditData.courses2,
        courses3:this.profileEditData.courses3,
      });
    }
  }

  public toClose(): void {
    $('#alertModal').modal('close');
  }

  public onClickNext(): void {
    this.submitted = true;
    if(this.cousesForm.invalid){
      for (const key of Object.keys(this.cousesForm.controls)) {
        if (this.cousesForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
   else {
      localStorage.setItem(
        'coursesFormValue',
        JSON.stringify(this.cousesForm.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/exams']);
    }
  }

  toBack() {
    this._router.navigate(['/home']);
  }
  public onClickBack(): void {
    this._router.navigate(['/student/specialization']);
  }

  // public async getCourseData(selectedData: any): Promise<void> {

  //   if (selectedData) {
  //     this.coursesData = [];
  //     //this.entranceExamData = [];
  //     let results= await this._getCoursesList()
  //     selectedData.forEach((element: string) => {
  //       this.items.forEach((item: any) => {
  //         if (item.field === element) {
  //           this.coursesData.push(item);
  //           //this.entranceExamData.push(item.admissionProcedure);

  //         }
  //       });
  //     });
  //     //this.examFileteredData=Array.from(new Set(this.entranceExamData));
  //   }
  // }

  private _getCoursesList(): void {
    if(this.language==="tamil"){
      this.httpClient.get<any>("assets/survey-json/courses-tm.json").subscribe((res:any)=>{
        if (res.status == 200) {
          this.coursesData = res.results;
         // this.speclFilteredArray = this.items;
        }
      });
    }
    else{
      this.httpClient.get<any>("assets/survey-json/courses-en.json").subscribe((res:any)=>{
        if (res.status == 200) {
          this.coursesData = res.results;
          //this.speclFilteredArray = this.items;
        }
      });
    }

  }
}
