import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from '../shared/services/common/common.service';
import { LanguageService } from '../shared/services/common/language.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-step-wizard',
  templateUrl: './step-wizard.component.html',
  styleUrls: ['./step-wizard.component.scss'],
})
export class StepWizardComponent implements OnInit {
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

  profileInfoFormGroup = this._formBuilder.group({
    emid: ['', Validators.required],
    fullName: ['', Validators.required],
    studentMedium: ['', Validators.required],
    studentHome: ['', Validators.required],
    fatherOccupation: ['', Validators.required],
   // fatherOccupationDetail: ['', ''],
    fatherQualification: ['', Validators.required],
    motherOccupation: ['', ''],
    //motherOccupationDetail: ['', Validators.required],
    motherQualification: ['', Validators.required],
    familyAnnualIncome: ['', ''],
    siblings: ['', Validators.required],
  });
  academicInfoForm = this._formBuilder.group({
    likedSubject: ['', Validators.required],
    unlikedSubject: ['', Validators.required],
  });
  higherEducationInfoForm = this._formBuilder.group({
    pursueHigherEducation: ['', Validators.required],
    interestedCourse: ['', Validators.required],
    interestedCollege: ['', Validators.required],
    worriedAboutCollege: ['', Validators.required],
    worriedAboutFees: ['', Validators.required],
    higherEducationAwayFromHometown: ['', Validators.required],
    challengesInHigherEducation: ['', Validators.required],
    specilaztions: ['', Validators.required],
    specilaztionsCourses: ['', Validators.required],
    interestedForStudy: ['', Validators.required],
    entranceExams: ['', Validators.required],
  });
  carrerInfoForm = this._formBuilder.group({
    preferJob: ['', Validators.required],
    interestedGoverementJobs: [''],
    interestedSectors: [''],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private _commonService: CommonService,
    private _location: Location,
    public lang: LanguageService,
    private _router: Router
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.userDetails = JSON.parse(
      localStorage.getItem('userDetails') as string
    );
    if (!this.userDetails) {
      this._router.navigate(['/home']);
    } else {
      this.profileInfoFormGroup.patchValue({
        fullName: this.userDetails.student_name,
        emid: this.userDetails.student_id,
      });
    }
  }
  ngOnInit() {
    this._getSpecialization();
    this._getCoursesList();
    this._getCareers();
  }
  public getPreferedJobData(job: string) {
    // 
    // this.carrerInfoForm.setValidators({interestedGoverementJobs:})
    // this.profileForm.get('secretPwd').updateValueAndValidity();
    // console.log({ job });
  }
  public clickFormSubmit(): void {
    console.log(this.profileInfoFormGroup)
    if (
      this.carrerInfoForm.invalid ||
      this.profileInfoFormGroup.invalid ||
      this.academicInfoForm.invalid ||
      this.higherEducationInfoForm.invalid
    ) {
      debugger
      $('#alertModal').modal('show');
      return;
    } else {
      const {
        emid,
        familyAnnualIncome,
        fatherOccupation,
        fatherOccupationDetail,
        fatherQualification,
        fullName,
        motherOccupation,
        motherOccupationDetail,
        motherQualification,
        siblings,
        studentHome,
        studentMedium,
      } = this.profileInfoFormGroup.value;
      const { likedSubject, unlikedSubject } = this.academicInfoForm.value;
      const {
        pursueHigherEducation,
        interestedCourse,
        interestedCollege,
        worriedAboutCollege,
        worriedAboutFees,
        higherEducationAwayFromHometown,
        challengesInHigherEducation,
        specilaztions,
        specilaztionsCourses,
        interestedForStudy,
        entranceExams,
      } = this.higherEducationInfoForm.value;
      const { interestedGoverementJobs, interestedSectors, preferJob } =
        this.carrerInfoForm.value;

      const payload = {
        emsId: Number(emid),
        fullName: fullName,
        medium: studentMedium,
        location: studentHome,
        fatherOccupation: fatherOccupation,
        fatherOccupationDetail: '',
        fatherEducation: fatherQualification,
        motheOccupationType: motherOccupation,
        motherOccupationDetails: '',
        motherEducationalQualification: motherQualification,
        familyAnnualIncome: familyAnnualIncome,
        intrestedSubject: likedSubject,
        unintrestedSubject: unlikedSubject,
        sibilings: Number(siblings),
        pursueHigherEducation: pursueHigherEducation,
        IntrestedCourse: interestedCourse,
        IntrestedCollege: interestedCollege,
        worriedAboutCollege: worriedAboutCollege,
        worriedAboutFees: worriedAboutFees,
        higherEducationAwayFromHometown: higherEducationAwayFromHometown,
        challengesInHigherEducation: challengesInHigherEducation,
        specilaztions: JSON.stringify(specilaztions),
        specilaztionsCourses: JSON.stringify(specilaztionsCourses),
        interestedForStudy: interestedForStudy,
        entranceExams: JSON.stringify(entranceExams),
        preferJob: preferJob,
        interestedGoverementJobs: interestedGoverementJobs.toString(),
        interestedSectors: JSON.stringify(interestedSectors),
      };
      this._commonService
        .postService('/survey/add', payload)
        .subscribe((res: any) => {
          if (res.status == 200) {
            $('#successModal').modal('show');
          }
        });
    }
  }

  public toClose(): void {
    $('#alertModal').modal('close');
  }

  public getCourseData(selectedData: any): void {
  if(selectedData){
      this.coursesData = [];
      this.entranceExamData=[];
      selectedData.forEach((element: string) => {
        this.items.forEach((item: any) => {
          if (item.field === element) {
            this.coursesData.push(item);
            this.entranceExamData.push(item)
          }
        });
      });
    }
    
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
}
