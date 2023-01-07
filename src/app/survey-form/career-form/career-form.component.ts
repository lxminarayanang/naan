import { Component, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { LanguageService } from '../../shared/services/common/language.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.scss'],
})
export class CareerFormComponent implements OnInit {
  public toppingList: string[] = [];
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
    //importantForEducation: [''],
    challengesInHigherEducation: ['', Validators.required],
    specilaztions:[],
    intrestedCourse: [],
    entranceExams: [],
    accessedGoverementSchemes:[],
    awareGovtSchemes:[],
    likedColleges:['', Validators.required],
   // graduationAwayFromHometown:['', Validators.required],
    other_reason_higher_education:[''],
//uniform:['', Validators.required],
// bookbags_bages:['', Validators.required],
// nutrition:['', Validators.required],
// laptop:['', Validators.required],
// bicycle:['', Validators.required],
// backward_or_tribal_scholorship:['', Validators.required],
// selva_daughter_scheme:['', Validators.required],
// cm_breakfast_scheme	:['', Validators.required],
// special_incentives:['', Validators.required],
// shoes:['', Validators.required],
// mathematical_toolbox:['', Validators.required],
// bus_travel_card:['', Validators.required],
// financial_assistance_lost_parents:['', Validators.required],
// financial_assistance_lost_parents_corona:['', Validators.required],
reservation_for_govt_school:['', Validators.required],
pudhumai_penn_scheme:['', Validators.required],
vidyalakshmi_education_loan_scheme:['', Validators.required],
stipend_for_first_graduate:['', Validators.required],
postmatric_scholarships	:['', Validators.required],
five_percent_seats_with_benchmark_disabilities:['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _commonService: CommonService,
    private _location: Location,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef,
    private httpClient:HttpClient
  ) {}
  ngOnInit() {
    console.log('adbjadad',this.lang)
    window.scrollTo(0, 0);
   // this._getCareers();
    this.profileEditData = JSON.parse(
      localStorage.getItem('careerFormValue') as string
    );
this.higherEducationInfoForm.get("challengesInHigherEducation").valueChanges.subscribe((value:any) => {
  if(value.includes('மற்றவை') | value.includes('Other')){
    this.higherEducationInfoForm
      .get('other_reason_higher_education')?.setValidators([Validators.required]);
    this.higherEducationInfoForm.get('other_reason_higher_education')?.updateValueAndValidity();
  } else {
    this.higherEducationInfoForm.get('other_reason_higher_education')?.clearValidators();
    this.higherEducationInfoForm.get('other_reason_higher_education')?.updateValueAndValidity();
  }
})
    if (this.profileEditData) {
      // this.graduationAwayFromHometwn =
      //   this.profileEditData.graduationAwayFromHometown;
      // this.graduationAwayFromHometwnModel =
      //   this.profileEditData.challengesGraduationAwayFromHometown;
      // this.selectedSpecialization =
      //   this.profileEditData.specilaztions;

    this.higherEducationInfoForm.patchValue({
    specilaztions:this.profileEditData.specilaztions,
   // importantForEducation:  this.profileEditData.importantForEducation,
    challengesInHigherEducation:  this.profileEditData.challengesInHigherEducation,
    intrestedCourse:  this.profileEditData.intrestedCourse,
    entranceExams:  this.profileEditData.entranceExams,
    accessedGoverementSchemes: this.profileEditData.accessedGoverementSchemes,
    awareGovtSchemes: this.profileEditData.awareGovtSchemes,
    likedColleges: this.profileEditData.likedColleges,
    graduationAwayFromHometown: this.profileEditData.graduationAwayFromHometown,
    other_reason_higher_education:this.profileEditData.other_reason_higher_education,
    uniform:this.profileEditData.uniform,
    bookbags_bages:this.profileEditData.bookbags_bages,
    nutrition:this.profileEditData.nutrition,
    laptop:this.profileEditData.laptop,
    bicycle:this.profileEditData.bicycle,
    backward_or_tribal_scholorship:this.profileEditData.backward_or_tribal_scholorship,
    selva_daughter_scheme:this.profileEditData.selva_daughter_scheme,
    cm_breakfast_scheme	:this.profileEditData.cm_breakfast_scheme,
    special_incentives:this.profileEditData.special_incentives,
    shoes:this.profileEditData.shoes,
    mathematical_toolbox:this.profileEditData.mathematical_toolbox,
    bus_travel_card:this.profileEditData.bus_travel_card,
    financial_assistance_lost_parents:this.profileEditData.financial_assistance_lost_parents,
    financial_assistance_lost_parents_corona:this.profileEditData.financial_assistance_lost_parents_corona,
    reservation_for_govt_school:this.profileEditData.reservation_for_govt_school,
    pudhumai_penn_scheme:this.profileEditData.pudhumai_penn_scheme,
    vidyalakshmi_education_loan_scheme:this.profileEditData.vidyalakshmi_education_loan_scheme,
    stipend_for_first_graduate:this.profileEditData.stipend_for_first_graduate,
    postmatric_scholarships	:this.profileEditData.postmatric_scholarships,
    five_percent_seats_with_benchmark_disabilities:this.profileEditData.five_percent_seats_with_benchmark_disabilities,
      });
    }
  }
  public onClickBack(): void {
    this._router.navigate(['/student/exams']);
  }

  public toClose(): void {
    $('#alertModal').modal('close');
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
      this._router.navigate(['/student/certificate']);
    }
  }

  toBack() {
    this._location.back();
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
