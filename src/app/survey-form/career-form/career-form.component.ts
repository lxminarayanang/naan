import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { LanguageService } from '../../shared/services/common/language.service';
declare var $: any;

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.scss'],
})
export class CareerFormComponent implements OnInit {
  public toppingList: string[] = [];
  public specilaztions: any[] = [];
  public coursesListData: any[] = [];
  public items: any[] = [];
  public speclFilteredArray: any[] = [];
  public selectedSpecialization: any;
  public selectedSpecializationCourses: any;
  public coursesData: any[] = [];
  public entranceExamData: any[] = [];
  public careersData: any[] = [];
  public preferedJobValue: string = '';
  public userDetails: any = {};
  public graduationAwayFromHometwn: string = '';
  public graduationAwayFromHometownData: string = '';
  public graduationAwayFromHometwnModel: string = '';
  public reasonGraduationAwayFromHometownData: string = '';
  public interestedForStudyDataModel: string = '';
  public interestedForStudyDataModelChange: string = '';
  public appliedEntranceExam1: string = '';
  public profileEditData: any;
  public submitted: boolean = false;

  higherEducationInfoForm: any = this._formBuilder.group({
    courseIdea: ['', Validators.required],
    collegeIdea: ['', Validators.required],
    worriedAboutAdmission: ['', Validators.required],
    worriedAboutFees: ['', Validators.required],
    graduationAwayFromHometown: ['', Validators.required],
    challengesGraduationAwayFromHometown: [''],
    reasonGraduationAwayFromHometown: [''],
    IntrestedHigherEducation: ['', Validators.required],
    reasonIntrestedCourse: ['', Validators.required],

    //IntrestedCourse: ['', Validators.required],
    otherReasonIntrestedCourse: [''],
    appliedEntranceExam: ['', Validators.required],
    listAppliedEntranceExam: [''],
  });

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
      localStorage.getItem('careerFormValue') as string
    );
    if (this.profileEditData) {
      this.graduationAwayFromHometwn =
        this.profileEditData.graduationAwayFromHometown;
      this.graduationAwayFromHometwnModel =
        this.profileEditData.challengesGraduationAwayFromHometown;
      this.selectedSpecialization =
        this.profileEditData.IntrestedHigherEducation;
      this.interestedForStudyDataModel =
        this.profileEditData.reasonIntrestedCourse;
      this.appliedEntranceExam1 = this.profileEditData.appliedEntranceExam;

      this.higherEducationInfoForm.patchValue({
        courseIdea: this.profileEditData.courseIdea,
        collegeIdea: this.profileEditData.collegeIdea,
        worriedAboutAdmission: this.profileEditData.worriedAboutAdmission,
        worriedAboutFees: this.profileEditData.worriedAboutFees,

        reasonGraduationAwayFromHometown:
          this.profileEditData.reasonGraduationAwayFromHometown,

        otherReasonIntrestedCourse:
          this.profileEditData.otherReasonIntrestedCourse,

        listAppliedEntranceExam: this.profileEditData.listAppliedEntranceExam,
      });
    }
  }
  public onClickBack(): void {
    this._router.navigate(['/student/academic']);
  }
  public getPreferedJobData(job: string) {
    //
    // this.carrerInfoForm.setValidators({interestedGoverementJobs:})
    // this.profileForm.get('secretPwd').updateValueAndValidity();
    // console.log({ job });
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
  public onClickNext(): void {
    this.submitted = true;
    if (this.higherEducationInfoForm.valid) {
      localStorage.setItem(
        'careerFormValue',
        JSON.stringify(this.higherEducationInfoForm.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/career-interest']);
    } else {
      return;
    }
  }

  public onChangeChallenges(graduationAwayFromHometwn: any): void {
    this.graduationAwayFromHometownData = graduationAwayFromHometwn;
    debugger;
  }
  public onChangeChallengesModel(graduationAwayFromHometwn: any): void {
    this.reasonGraduationAwayFromHometownData = graduationAwayFromHometwn;
    debugger;
  }

  public onChangeInterestedStudey(interestedForStudyDataModel: string): void {
    this.interestedForStudyDataModelChange = interestedForStudyDataModel;
  }
  // public getExamDataBasedOnSpcl(data:any):void{

  //   this.entranceExamData=[];
  //   if(data){
  //     data.forEach((item: any) => {

  //       data.forEach((element: string) => {
  //         this.items.forEach((item: any) => {
  //           if (item.field === element) {
  //             this.coursesData.push(item);

  //           }
  //         });
  //       });

  //     });
  //   }
  //   Array.from(new Set(this.entranceExamData))
  // }
  toBack() {
    this._location.back();
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

  keyPressAlphaCharacters(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
