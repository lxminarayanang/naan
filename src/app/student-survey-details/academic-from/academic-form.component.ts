import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/services/common/language.service';
import { CommonService } from '../../shared/services/common/common.service';
declare var $: any;

@Component({
  selector: 'app-academic-form',
  templateUrl: './academic-form.component.html',
  styleUrls: ['./academic-form.component.scss'],
})
export class AcademicFormComponent implements OnInit {
  public userDetails: any = {};
  public profileEditData: any;
  public submitted: boolean = false;
  public studentData: any[] = [];
  public filteredData: any;
  public registerNumbers: any[] = [];
  public districtData: any[] = [];
  public schoolDetails: any[] = [];
  public collegeTypeValueCheck: boolean = false;
  public isRegisterNumberModel: boolean = false;

  studentProfileNumberForm: any = this._formBuilder.group({
    isRegisterNumber: ['', Validators.required],
  });
  studentProfile: any = this._formBuilder.group({
    Register_Number: [''],
    EMIS_number: [''],
    Name: new FormControl ('', Validators.required),
    Phone_Number: [
      '',
      [Validators.required, Validators.pattern('(0|91)?[6-9][0-9]{9}')],
    ],
    Current_Contact_Number: [
      '',
      [Validators.required, Validators.pattern('(0|91)?[6-9][0-9]{9}')],
    ],
    Current_Whatsapp_Number: [
      '',
      [Validators.required, Validators.pattern('(0|91)?[6-9][0-9]{9}')],
    ],
    Alternative_Number: [
      '',
      [Validators.required, Validators.pattern('(0|91)?[6-9][0-9]{9}')],
    ],
    Location: ['', Validators.required],
    Taluk: ['', Validators.required],
    District: ['', Validators.required],
    pincode: ['', [Validators.required,Validators.pattern(/^\d{6}$/)]],
    Group: [''],
    total_marks: [''],
    Result: [''],
    HSC_Passout_Year: ['', Validators.required],
    medium: [''],
    is_Applied_College: ['', Validators.required],
    Reason_Not_Apply: [''],
    Written_Entrance_Exam: ['', Validators.required],
    List_of_conselling: [''],
    Waiting_for_Counselling: ['', Validators.required],
    Exam_List: [''],
    Got_Admission: ['', Validators.required],
    admission_college: [''],
    admission_district: [''],
    admission_college_type: [''],
    Course: [''],
    College_name: [''],
    admission_course: [''],
    College_Type: [''],
    other_reason_list_of_counselling: [''],
    other_reason_exam_list: [''],
    other_reason_for_appplying_college: [],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    public lang: LanguageService,
    private _router: Router,
    private _commonService: CommonService,
    private el: ElementRef
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    const udise_code = JSON.parse(localStorage.getItem('udise_code') as string);
    this.GetStudentDetails(udise_code);
    this._getStudentDetails();
    this.studentProfileNumberForm.controls.isRegisterNumber.valueChanges.subscribe(
      (value: string) => {
        if (value === 'No') {
          this.studentProfile.reset()

          localStorage.removeItem("studentDetail");

          this.isRegisterNumberModel=false;
          this.studentProfile
          .get('Register_Number')
          .clearValidators();
          this.studentProfile
          .get('EMIS_number')
          .clearValidators();
          this.studentProfile
          .get('Group')
          .clearValidators();
          this.studentProfile
          .get('total_marks')
          .clearValidators();
          this.studentProfile
          .get('medium')
          .clearValidators();
          this.studentProfile.get('Name').updateValueAndValidity();
          this.studentProfile.get('Phone_Number').updateValueAndValidity();
          this.studentProfile.get('Register_Number').updateValueAndValidity();
          this.studentProfile.get('EMIS_number').updateValueAndValidity();
          this.studentProfile.get('Group').updateValueAndValidity();
          this.studentProfile.get('total_marks').updateValueAndValidity();
          this.studentProfile.get('Reason_Not_Apply').updateValueAndValidity();
          this.studentProfile.get('medium').updateValueAndValidity();
        } else {

          localStorage.removeItem("studentDetail");
          console.log(this.studentProfile.value);
          this.isRegisterNumberModel=true;
          this.studentProfile
          .get('Register_Number')
          .setValidators([Validators.required]);
          this.studentProfile
          .get('EMIS_number')
          .setValidators([Validators.required]);
          this.studentProfile
          .get('Group')
          .setValidators([Validators.required]);
          this.studentProfile
          .get('total_marks')
          .setValidators([Validators.required]);
          this.studentProfile
          .get('medium')
          .setValidators([Validators.required]);
          this.studentProfile.get('Register_Number').updateValueAndValidity();
          this.studentProfile.get('EMIS_number').updateValueAndValidity();
          this.studentProfile.get('Group').updateValueAndValidity();
          this.studentProfile.get('total_marks').updateValueAndValidity();
          this.studentProfile.get('Reason_Not_Apply').updateValueAndValidity();
          this.studentProfile.get('medium').updateValueAndValidity();
        }
      }
    );
    this.studentProfile.controls.Register_Number.valueChanges.subscribe(
      (value: string) => {
        this._studentDataBasedOnRegisterNumber(value);
      }
    );


    this.studentProfile.controls.College_name.valueChanges.subscribe(
      (value: string) => {
        if (value?.length > 0) {
          this.studentProfile
            .get('College_Type')
            .setValidators([Validators.required]);
          this.studentProfile.get('College_Type').updateValueAndValidity();
          this.collegeTypeValueCheck = true;
        } else {
          this.studentProfile.get('College_Type').clearValidators();
          this.studentProfile.get('College_Type').updateValueAndValidity();
          this.collegeTypeValueCheck = false;
        }
      }
    );

    this.studentProfile.controls.is_Applied_College.valueChanges.subscribe(
      (value: string) => {
        if (value === 'No') {
          this.studentProfile
            .get('Reason_Not_Apply')
            .setValidators([Validators.required]);
          this.studentProfile.get('Reason_Not_Apply').updateValueAndValidity();
        } else {
          this.studentProfile.get('Reason_Not_Apply').clearValidators();
          this.studentProfile.get('Reason_Not_Apply').updateValueAndValidity();
        }
      }
    );
    this.studentProfile.controls.Written_Entrance_Exam.valueChanges.subscribe(
      (value: string) => {
        if (value === 'Yes') {
          this.studentProfile
            .get('Exam_List')
            .setValidators([Validators.required]);
          this.studentProfile.get('Exam_List').updateValueAndValidity();
        } else {
          this.studentProfile.get('Exam_List').clearValidators();
          this.studentProfile.get('Exam_List').updateValueAndValidity();
        }
      }
    );
    this.studentProfile.controls.Waiting_for_Counselling.valueChanges.subscribe(
      (value: string) => {
        if (value === 'Yes') {
          this.studentProfile
            .get('List_of_conselling')
            .setValidators([Validators.required]);
          this.studentProfile
            .get('List_of_conselling')
            .updateValueAndValidity();
        } else {
          this.studentProfile.get('List_of_conselling').clearValidators();
          this.studentProfile
            .get('List_of_conselling')
            .updateValueAndValidity();
        }
      }
    );
    this.studentProfile.controls.Got_Admission.valueChanges.subscribe(
      (value: string) => {
        if (value === 'Yes') {
          this.studentProfile
            .get('admission_district')
            .setValidators([Validators.required]);
          this.studentProfile
            .get('admission_course')
            .setValidators([Validators.required]);
          this.studentProfile
            .get('admission_college')
            .setValidators([Validators.required]);
          this.studentProfile
            .get('admission_college_type')
            .setValidators([Validators.required]);
          this.studentProfile
            .get('admission_district')
            .updateValueAndValidity();
          this.studentProfile.get('admission_course').updateValueAndValidity();
          this.studentProfile.get('admission_college').updateValueAndValidity();
          this.studentProfile
            .get('admission_college_type')
            .updateValueAndValidity();
        } else {
          this.studentProfile.get('admission_district').clearValidators();
          this.studentProfile.get('admission_course').clearValidators();
          this.studentProfile.get('admission_college').clearValidators();
          this.studentProfile.get('admission_college_type').clearValidators();
          this.studentProfile
            .get('admission_district')
            .updateValueAndValidity();
          this.studentProfile.get('admission_course').updateValueAndValidity();
          this.studentProfile.get('admission_college').updateValueAndValidity();
          this.studentProfile
            .get('admission_college_type')
            .updateValueAndValidity();
        }
      }
    );

    this.profileEditData = JSON.parse(
      localStorage.getItem('studentDetail') as string
    );
    if (this.profileEditData) {
      this.studentProfile.patchValue({
        isRegisterNumber:this.profileEditData.isRegisterNumber,
        Register_Number: this.profileEditData.Register_Number,
        EMIS_number: this.profileEditData.EMIS_number,
        Name: this.profileEditData.Name,
        Phone_Number: this.profileEditData.Phone_Number,
        Current_Contact_Number: this.profileEditData.Current_Contact_Number,
        Current_Whatsapp_Number: this.profileEditData.Current_Whatsapp_Number,
        Alternative_Number: this.profileEditData.Alternative_Number,
        Location: this.profileEditData.Location,
        Taluk: this.profileEditData.Taluk,
        District: this.profileEditData.District,
        pincode: this.profileEditData.pincode,
        Group: this.profileEditData.Group,
        total_marks: this.profileEditData.total_marks,
        Result: this.profileEditData.Result,
        HSC_Passout_Year: this.profileEditData.HSC_Passout_Year,
        medium: this.profileEditData.medium,
        is_Applied_College: this.profileEditData.is_Applied_College,
        Reason_Not_Apply: this.profileEditData.Reason_Not_Apply,
        Written_Entrance_Exam: this.profileEditData.Written_Entrance_Exam,
        List_of_conselling: this.profileEditData.List_of_conselling,
        Waiting_for_Counselling: this.profileEditData.Waiting_for_Counselling,
        Exam_List: this.profileEditData.Exam_List,
        Got_Admission: this.profileEditData.Got_Admission,
        admission_college: this.profileEditData.admission_college,
        admission_district: this.profileEditData.admission_district,
        admission_college_type: this.profileEditData.admission_college_type,
        Course: this.profileEditData.Course,
        College_name: this.profileEditData.College_name,
        admission_course: this.profileEditData.admission_course,
        College_Type: this.profileEditData.College_Type,
      });
    }
  }

  public GetStudentDetails(udise_code: string): void {
    this._commonService

      .getService(`/student_details?udise_code=${udise_code}`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.studentData = res.results;
        }
      });
  }

  private _getStudentDetails(): void {
    this._commonService.getService(`/school_details`).subscribe((res: any) => {
      if (res.status == 200) {
        this.schoolDetails = res.results;
        this.schoolDetails.forEach((item: any) => {
          this.districtData.push(item.District);
        });
        this.districtData = [...new Set(this.districtData)];
      }
    });
  }

  public onClickNext(): void {
    this.submitted = true;
    this.studentProfile.updateValueAndValidity();
    if (this.studentProfile.invalid) {
      for (const key of Object.keys(this.studentProfile.controls)) {
        if (this.studentProfile.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector(
            '[formcontrolname="' + key + '"]'
          );
          invalidControl.focus();
          break;
        }
      }
    } else {
      localStorage.setItem(
        'studentDetail',
        JSON.stringify(this.studentProfile.value)
      );
      this._router.navigate(['/survey/solution-provided']);
    }
  }

  public onClickBack(): void {
    this._router.navigate(['/survey/alumni2022']);
  }

  private _studentDataBasedOnRegisterNumber(value: string): void {
    debugger;
    this.filteredData = this.studentData.find(
      (data: any) => data.Register_Number === value
    );
    if (this.filteredData) {
      this.studentProfile.patchValue({
        Phone_Number: this.filteredData.mobile,
        EMIS_number: this.filteredData.emis_id,
        Name: this.filteredData.name,
        Group: this.filteredData.Group_Name,
        total_marks: this.filteredData.total_marks,
        Result: this.filteredData.Result,
        medium: this.filteredData.mobile === 'E' ? 'English' : 'Tamil',
      });
    }
  }

  public keyPressAlphaCharacters(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

}
