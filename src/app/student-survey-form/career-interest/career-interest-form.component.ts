import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  public toppingList: string[] = [];
  public specilaztions: any[] = [];
  public coursesListData: any[] = [];
  public entranceGovExamJobsData:any[]=[];
  public items: any[] = [];
  public speclFilteredArray: any[] = [];
  public selectedSpecialization: any;
  public selectedSpecializationCourses: any;
  public coursesData: any[] = [];
  public entranceExamData: any[] = [];
  public careersData: any[] = [];
  public preferedJobValue: string = '';
  public userDetails: any = {};
  public careerDataModel: string = '';
  public careerDataModelVaue: string = '';
  public profileEditData: any;
  public submitted: boolean = false;

  carrerInfoForm: any = this._formBuilder.group({
    preferJobSectos: ['', Validators.required],
    interestedGoverementJobs: ['', Validators.required],
    interestedSectors: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private _commonService: CommonService,
    private _location: Location,
    public lang: LanguageService,
    private _router: Router
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this._getSpecialization();
    this._getCoursesList();
    this._getCareers();
    this.profileEditData = JSON.parse(
      localStorage.getItem('careerInterestFormValue') as string
    );

    if (this.profileEditData) {
      this.preferedJobValue = this.profileEditData.jobSector;
      this.careerDataModel = this.profileEditData.careerGuidance;
      this.carrerInfoForm.patchValue({
        sectorInterested: this.profileEditData.sectorInterested,
        careerGuidance: this.profileEditData.careerGuidance,
        guide: this.profileEditData.guide,
        abroadCourse: this.profileEditData.abroadCourse,
      });
    }
  }

  public getPreferedJobData(job: string) {
    //
    // this.carrerInfoForm.setValidators({interestedGoverementJobs:})
    // this.profileForm.get('secretPwd').updateValueAndValidity();
    // console.log({ job });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.carrerInfoForm.valid) {
      const profileData = JSON.parse(
        localStorage.getItem('profileFormValue') as any
      );
      const academicFormValue = JSON.parse(
        localStorage.getItem('academicFormValue') as any
      );

      const careerFormValue = JSON.parse(
        localStorage.getItem('careerFormValue') as any
      );
      const { pursueHigherEducation,
        pursueHigherEducationImportant,
        specilaztions,
        intrestedCourse,
        entranceExams,
        intrestedCollege,
        worriedAboutCollege,
        worriedAboutFees,
        worriedAboutFamily,
        higherEducationAwayFromHometown,
        challengesInHigherEducation,
        reasonIntrestedCourse,
        accessedGoverementSchemes,
        awarnessScheme,
        certificateForHigherEducation,
        certificateList
      }=careerFormValue;

     let careerdata={
      pursueHigherEducation,
        pursueHigherEducationImportant,
        specilaztions:specilaztions.toString(),
        intrestedCourse:intrestedCourse.toString(),
        entranceExams:entranceExams.toString(),
        intrestedCollege,
        worriedAboutCollege,
        worriedAboutFees,
        worriedAboutFamily,
        higherEducationAwayFromHometown,
        challengesInHigherEducation,
        reasonIntrestedCourse,
        accessedGoverementSchemes,
        awarnessScheme,
        certificateForHigherEducation,
        certificateList:certificateList?certificateList.toString():''
     }

      const {preferJobSectos,interestedGoverementJobs,interestedSectors}=this.carrerInfoForm.value
      const payloadData = {...profileData,...academicFormValue,...careerdata,preferJobSectos,interestedSectors:interestedSectors.toString(),interestedGoverementJobs:interestedGoverementJobs.toString()}



      this._commonService
      .postService('/student-survey/add',payloadData)
      .subscribe((res: any) => {
        debugger;
        if (res.status == 200) {
          $('#successModal').modal('show');
          localStorage.removeItem('profileFormValue');
          localStorage.removeItem('academicFormValue');
          localStorage.removeItem('careerFormValue');
          localStorage.removeItem('careerInterestFormValue');
        }
      });
    }

  }

  public toClose(): void {
    $('#alertModal').modal('close');
  }

  public getCourseData(selectedData: any): void {
    if (selectedData) {
      this.coursesData = [];
      this.entranceExamData = [];
      selectedData.forEach((element: string) => {
        this.items.forEach((item: any) => {
          if (item.field === element) {
            this.coursesData.push(item);
            this.entranceExamData.push(item);
          }
        });
      });
    }
  }

  toBack() {
    this._router.navigate(['/student/survey/profile']);
  }

  private _getSpecialization(): void {
    this._commonService
      .getService(`/courses/filter?menu=field`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.specilaztions = res.results;
          //  this.getExamDataBasedOnSpcl(res.results)
        }
      });
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
  private _getCoursesList(): void {
    this._commonService.getService(`/courses`).subscribe((res: any) => {
      if (res.status == 200) {
        this.items = res.results;
        this.speclFilteredArray = this.items;
      }
    });
  }

  public onChangecareerDataModel(careerDataModel: string): void {
    this.careerDataModelVaue = careerDataModel;
  }

  public onClickBack(): void {
    this._router.navigate(['/student/survey/career']);
  }
}
