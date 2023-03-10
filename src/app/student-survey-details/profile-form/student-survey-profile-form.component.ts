import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { LanguageService } from '../../shared/services/common/language.service';
import { uniq } from 'lodash';
declare var $: any;

@Component({
  selector: 'app-student-profile-form',
  templateUrl: './student-survey-profile-form.component.html',
  styleUrls: ['./student-survey-profile-form.component.scss'],
})
export class StudentSurveyProfileFormComponent implements OnInit {
  public userDetails: any = {};
  public profileEditData: any;
  public submitted: boolean = false;
  public studentData: any[] = [];
  public subDistrictData: any[] = [];
  public uidData: any[] = [];
  public distrcitData: any[] = [];
  public schoolData: any[] = [];

  profileInfoFormGroup: any = this._formBuilder.group({
    District: ['', Validators.required],
    Sub_District: ['', Validators.required],
    School_Name: ['', Validators.required],
    udise_code: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    public lang: LanguageService,
    private _router: Router,
    private _commonService: CommonService,
    private el: ElementRef
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    localStorage.removeItem('udise_code')
    this._getStudentDetails();
    this.profileEditData = JSON.parse(
      localStorage.getItem('profileFormValue') as string
    );

    this.profileInfoFormGroup.controls.District.valueChanges.subscribe(
      (value: string) => {
        this._getDistrictData(value);
      }
    );
    this.profileInfoFormGroup.controls.School_Name.valueChanges.subscribe(
      (value: string) => {
        this._getuid(value);
      }
    );
     this.profileInfoFormGroup.controls.Sub_District.valueChanges.subscribe(
      (value: string) => {
        if(value){
          this._getSchool(value);
        }

      }
    );
  }

  private _getSchool(subdistrict:string):void{
    this.schoolData=[];
this.studentData.forEach((item: any) => {
      if(item.Sub_District===subdistrict){
        this.schoolData.push(item.School_Name);
        this.schoolData=[...new Set(this.schoolData)]
      }
    });
  }
  private _getDistrictData(value: string): void {
    this.subDistrictData=[];
    this.schoolData=[];
      this.studentData.forEach((item: any) => {
      if (item.District === value) {
        this.subDistrictData.push(item.Sub_District);
        this.subDistrictData=[...new Set(this.subDistrictData)]
      }
    });
  }

  private _getuid(value: string): void {
    localStorage.removeItem('udise_code');
    const uidData = this.studentData.find((item: any) => item.School_Name===value);
    localStorage.setItem('udise_code',JSON.stringify(uidData?.udise_code))
    this.profileInfoFormGroup.patchValue({
      udise_code: uidData?.udise_code,
    });
  }

  private _getStudentDetails(): void {
    this._commonService.getService(`/school_details`).subscribe((res: any) => {
      if (res.status == 200) {
        this.studentData = res.results;
        this._districtDataAssigning();
      }
    })
  }

  public onClickNext(): void {

    this.submitted = true;
    if(this.profileInfoFormGroup.invalid){
      for (const key of Object.keys(this.profileInfoFormGroup.controls)) {
        if (this.profileInfoFormGroup.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }

   else{
      localStorage.setItem(
        'profileFormValue',
        JSON.stringify(this.profileInfoFormGroup.value)
      );
      this._router.navigate(['/survey/profile']);
    }
  }

  private _districtDataAssigning():void{
    if (this.profileEditData) {
      this.profileInfoFormGroup.patchValue({
        District: this.profileEditData.District,
        Sub_District: this.profileEditData.Sub_District,
        School_Name: this.profileEditData.School_Name,
        udise_code: this.profileEditData.udise_code,
      });
    }
    let data: any[] = [];
    this.studentData.forEach((item: any) => {
      data.push(item.District);
    }),
    this.distrcitData=[...new Set(data)]

  }
}
