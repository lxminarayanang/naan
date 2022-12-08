import { Component, ElementRef, OnInit } from '@angular/core';
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
  public examFileteredData:any=[];
  public specilaztionsArr:any = []
  public exams:any;

  higherEducationInfoForm: any = this._formBuilder.group({
    importantForEducation: ['', Validators.required],
    challengesInHigherEducation: ['', Validators.required],
    specilaztions: ['', Validators.required],
    intrestedCourse: ['', Validators.required],
    entranceExams: ['', Validators.required],
    accessedGoverementSchemes:['', Validators.required],
    documentList:['', Validators.required],
    awareGovtSchemes:['', Validators.required],
    likedColleges:['', Validators.required],
    graduationAwayFromHometown:['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private _commonService: CommonService,
    private _location: Location,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this._getCoursesList();
    this._getSpecialization();
    this._getExams();
    this._getCareers();
    this.profileEditData = JSON.parse(
      localStorage.getItem('careerFormValue') as string
    );
this.higherEducationInfoForm.get("specilaztions").valueChanges.subscribe((item:any) => {
  debugger;
   this.getCourseData(item)
})
    if (this.profileEditData) {
      debugger;
      // this.graduationAwayFromHometwn =
      //   this.profileEditData.graduationAwayFromHometown;
      // this.graduationAwayFromHometwnModel =
      //   this.profileEditData.challengesGraduationAwayFromHometown;
      // this.selectedSpecialization =
      //   this.profileEditData.specilaztions;

    this.higherEducationInfoForm.patchValue({
    specilaztions:this.profileEditData.specilaztions,
    importantForEducation:  this.profileEditData.importantForEducation,
    challengesInHigherEducation:  this.profileEditData.challengesInHigherEducation,
    intrestedCourse:  this.profileEditData.intrestedCourse,
    entranceExams:  this.profileEditData.entranceExams,
    accessedGoverementSchemes: this.profileEditData.accessedGoverementSchemes,
    documentList: this.profileEditData.documentList,
    awareGovtSchemes: this.profileEditData.awareGovtSchemes,
    likedColleges: this.profileEditData.likedColleges,
    graduationAwayFromHometown: this.profileEditData.graduationAwayFromHometown,
      });
    }
  }
  public onClickBack(): void {
    this._router.navigate(['/student/academic']);
  }

  public toClose(): void {
    $('#alertModal').modal('close');
  }

  public async getCourseData(selectedData: any): Promise<void> {
    debugger
    if (selectedData) {
      this.coursesData = [];
      //this.entranceExamData = [];
      let results= await this._getCoursesList()
      selectedData.forEach((element: string) => {
        this.items.forEach((item: any) => {
          if (item.field === element) {
            this.coursesData.push(item);
            //this.entranceExamData.push(item.admissionProcedure);

          }
        });
      });
      //this.examFileteredData=Array.from(new Set(this.entranceExamData));
    }
  }
  public onClickNext(): void {
    this.submitted = true;
    if(this.higherEducationInfoForm.invalid){
      for (const key of Object.keys(this.higherEducationInfoForm.controls)) {
        if (this.higherEducationInfoForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }
  else {
      localStorage.setItem(
        'careerFormValue',
        JSON.stringify(this.higherEducationInfoForm.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/observer']);
    }
  }

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
    private _getExams(): void {
    this._commonService
      .getService(`/exams`)
      .subscribe((res: any) => {
        debugger
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
