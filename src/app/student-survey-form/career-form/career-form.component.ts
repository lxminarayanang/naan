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
    pursueHigherEducation: ['', Validators.required],
    pursueHigherEducationImportant: ['', ''],
    specilaztions: ['', Validators.required],
    intrestedCourse: ['', Validators.required],
    entranceExams: ['', Validators.required],
    intrestedCollege: ['', Validators.required],
    worriedAboutCollege: ['', Validators.required],
    worriedAboutFees: ['', Validators.required],
    worriedAboutFamily: ['', Validators.required],
    higherEducationAwayFromHometown: [''],
    challengesInHigherEducation: [''],
    reasonIntrestedCourse: ['', Validators.required],
    accessedGoverementSchemes: ['', Validators.required],
    // awarnessScheme: [''],
    certificateForHigherEducation: ['',Validators.required],
    certificateList:['']


    // interestedForStudy: [''],
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
      this.selectedSpecialization = this.profileEditData.specilaztions;
      this.selectedSpecializationCourses = this.profileEditData.intrestedCourse;
      //   this.graduationAwayFromHometwn =
      //     this.profileEditData.higherEducationAwayFromHometown;
      //   this.graduationAwayFromHometwnModel =
      //     this.profileEditData.challengesGraduationAwayFromHometown;

      this.higherEducationInfoForm.patchValue({
        pursueHigherEducation: this.profileEditData.pursueHigherEducation,
        pursueHigherEducationImportant:
          this.profileEditData.pursueHigherEducationImportant,
          specilaztions:this.profileEditData.specilaztions,
        intrestedCourse:this.profileEditData.intrestedCourse,
        entranceExams: this.profileEditData.entranceExams,
        intrestedCollege: this.profileEditData.intrestedCollege,
        worriedAboutCollege: this.profileEditData.worriedAboutCollege,
        worriedAboutFees: this.profileEditData.worriedAboutFees,
        worriedAboutFamily: this.profileEditData.worriedAboutFamily,

        higherEducationAwayFromHometown:
          this.profileEditData.higherEducationAwayFromHometown,

        challengesInHigherEducation:
          this.profileEditData.challengesInHigherEducation,
          accessedGoverementSchemes:
          this.profileEditData.accessedGoverementSchemes,
        awarnessScheme: this.profileEditData.awarnessScheme,
        certificateForHigherEducation:
          this.profileEditData.certificateForHigherEducation,
          certificateList:this.profileEditData.certificateList,
          //awarnessScheme: [''],
        reasonIntrestedCourse: this.profileEditData.reasonIntrestedCourse,
        //interestedForStudy:this.profileEditData.interestedForStudy,
      });

    }
  }
  public onClickBack(): void {
    this._router.navigate(['/student/survey/academic']);
  }
  public getPreferedJobData(job: string) {
    //
    // this.carrerInfoForm.setValidators({interestedGoverementJobs:})
    // this.profileForm.get('secretPwd').updateValueAndValidity();
  }

  public toClose(): void {
    $('#alertModal').modal('close');
  }

  public getCourseData(selectedData: any): void {
    if (selectedData) {
      this.coursesData = [];
      this.entranceExamData = [];
      const data= JSON.parse(localStorage.getItem('specialArray')as any);
      selectedData.forEach((element: string) => {
        data.forEach((item: any) => {
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
      localStorage.setItem('careerFormValue', JSON.stringify(this.higherEducationInfoForm.value));
      this._router.navigate(['/student/survey/career-interest']);
    }
  }

  public onChangeChallenges(graduationAwayFromHometwn: any): void {
    this.graduationAwayFromHometownData = graduationAwayFromHometwn;
  }

  public onChangeChallengesModel(graduationAwayFromHometwn: any): void {
    this.reasonGraduationAwayFromHometownData = graduationAwayFromHometwn;
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
  private async _getCoursesList(): Promise<any> {
    this._commonService.getService(`/courses`).subscribe((res: any) => {
      if (res.status == 200) {
        this.items = res.results;
        this.speclFilteredArray = this.items;
      localStorage.setItem('specialArray',JSON.stringify(this.speclFilteredArray))

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
