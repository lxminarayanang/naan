import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { LanguageService } from '../../shared/services/common/language.service';
declare var $: any;

@Component({
  selector: 'app-observer-form',
  templateUrl: './observer-form.component.html',
  styleUrls: ['./observer-form.component.scss'],
})
export class ObserverFormComponent implements OnInit {
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
  public profileEditData: any;

  observerForm = this._formBuilder.group({
    observationCommentOne: [''],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,

    private _commonService: CommonService,
    private _location: Location,
    public lang: LanguageService,
    private _router: Router
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.profileEditData = JSON.parse(
      localStorage.getItem('careerInterestFormValue') as string
    );

    if (this.profileEditData) {
      this.observerForm.patchValue({
        observationCommentOne: this.profileEditData.observationCommentOne,
      });
    }
  }

  public clickFormSubmit(): void {
    const profileData = JSON.parse(
      localStorage.getItem('profileFormValue') as any
    );
    const academicFormValue = JSON.parse(
      localStorage.getItem('academicFormValue') as any
    );

    const careerFormValue = JSON.parse(
      localStorage.getItem('careerFormValue') as any
    );
    const careerInterestFormValue = JSON.parse(
      localStorage.getItem('careerInterestFormValue') as any
    );

    const payload = {
      ...profileData,
      ...academicFormValue,
      ...careerFormValue,
      ...careerInterestFormValue,
      ...this.observerForm.value,
    };
    const {
      emsId,
      fullName,
      dob,
      gender,
      firstGraduate,

      disability,
      disabilitypercentage,
      community,
      trainRoute,
      nearRailway,
      busRoute,
      nearBus,
      singleParent,
      father,
      mother,
      fatherPhysical,
      motherPhysical,
      gaurdian,
      gaurdianRelationship,
      fatherOccupation,
      fatherQualification,
      motherOccupation,
      motherQualification,
      familyAnnualIncome,
      siblings,
      school,
      hssGroupCode,
      hosteller,
      mediumInstruction,
      govtSchool,
      intrestedSubject,
      unintrestedSubject,
      courseIdea,
      collegeIdea,
      worriedAboutAdmission,
      worriedAboutFees,
      graduationAwayFromHometown,
      challengesGraduationAwayFromHometown,
      reasonGraduationAwayFromHometown,
      IntrestedHigherEducation,
      reasonIntrestedCourse,

      IntrestedCourse,
      otherReasonIntrestedCourse,
      appliedEntranceExam,
      listAppliedEntranceExam,
      jobSector,
      sectorInterested,
      careerGuidance,
      guide,
      abroadCourse,
      observationCommentOne,
    } = payload;

    const payloadUpdate = {
      emsId,
      fullName,
      dob,
      gender,
      firstGraduate,
      disability,
      disabilitypercentage,
      community,
      trainRoute,
      nearRailway,
      busRoute,
      nearBus,
      singleParent,
      father,
      mother,
      fatherPhysical: JSON.stringify(fatherPhysical),
      motherPhysical: JSON.stringify(motherPhysical),
      gaurdian,
      gaurdianRelationship,
      fatherOccupation,
      fatherQualification,
      motherOccupation,
      motherQualification,
      familyAnnualIncome,
      siblings,
      school,
      hssGroupCode,
      hosteller,
      mediumInstruction,
      govtSchool,
      intrestedSubject,
      unintrestedSubject,
      courseIdea,
      collegeIdea,
      worriedAboutAdmission,
      worriedAboutFees,
      graduationAwayFromHometown,
      challengesGraduationAwayFromHometown,
      reasonGraduationAwayFromHometown,
      IntrestedHigherEducation: JSON.stringify(IntrestedHigherEducation),
      reasonIntrestedCourse,

      IntrestedCourse: '',
      otherReasonIntrestedCourse,
      appliedEntranceExam: JSON.stringify(appliedEntranceExam),
      listAppliedEntranceExam,
      jobSector,
      sectorInterested: JSON.stringify(sectorInterested),
      careerGuidance,
      guide,
      abroadCourse,
      observationCommentOne,
    };
    this._commonService
      .postService('/newsurvey/add', payloadUpdate)
      .subscribe((res: any) => {
        if (res.status == 200) {
          $('#successModal').modal('show');
          localStorage.removeItem('profileFormValue');
          localStorage.removeItem('academicFormValue');
          localStorage.removeItem('careerFormValue');
          localStorage.removeItem('careerInterestFormValue');
        }
      });
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
    this._router.navigate(['/home']);
  }
  public onClickBack(): void {
    this._router.navigate(['/student/career-interest']);
  }
}
