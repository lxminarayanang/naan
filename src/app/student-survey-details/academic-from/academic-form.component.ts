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
  public isSchoolName:boolean=false;

  studentProfile: any = this._formBuilder.group({
    Register_Number: ['', Validators.required],
    EMIS_number: ['', Validators.required],
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
    gender:['', Validators.required],
    Taluk: ['', Validators.required],
    District: ['', Validators.required],
    pincode: ['', [Validators.required,Validators.pattern(/^\d{6}$/)]],
    Group: [''],
    total_marks: [''],
    Result: [''],
    HSC_Passout_Year: ['', Validators.required],
    medium: [''],
    is_Applied_College: [''],
    Reason_Not_Apply: [''],
    Written_Entrance_Exam: [''],
    List_of_conselling: [''],
    Waiting_for_Counselling: [''],
    Exam_List: [''],
    Got_Admission: ['', Validators.required],
    admission_college: [''],
    admission_district: [''],
    admission_college_type: [''],

    admission_course: [''],
    other_reason_list_of_counselling: [''],
    other_reason_exam_list: [''],
    other_reason_for_appplying_college: [],
    other_reason_for_admission_college:[],
    specialization:[],
    other_reason_for_specialization:[],
    joining_college:[],
    student_not_join:[],
    other_reason_for_student_not_join:[],
    repeated_entrance_exam:[],
    other_reason_for_student_not_apply:[],
    other_reason_for_repeated_entrance_exam:[],
    other_reason_for_student_not_apply_data:[],
    applied_specific_colleges:[],

    applied_college_district:[],
    applied_college:[],
    applied_course:[],
    applied_college_type:[],
    other_reason_for_applied_college:[],
    applied_course_specialization:[],
    other_reason_for_applied_specialization:[],
    reason_for_not_applying_entrance_exam:[],
    reason_for_not_apply_counselling:[]
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

    this.studentProfile.controls.EMIS_number.valueChanges.subscribe(
      (value: string) => {
        if(value){
          this._studentDataBasedOnRegisterNumber(value);
        }

      }
    );

    this.studentProfile.controls.admission_college_type.valueChanges.subscribe(
      (value: string) => {
        if(value){
          this._admissionCollgeTypeCheckMandatory(value);
        }
        }


    );
    this.studentProfile.controls.applied_course_specialization.valueChanges.subscribe(
      (value: string) => {
if(value && value==="Others"){
  this.studentProfile
            .get('other_reason_for_applied_specialization')
            .setValidators([Validators.required]);
          this.studentProfile.get('other_reason_for_applied_specialization').updateValueAndValidity();
        } else {
          this.studentProfile.get('other_reason_for_applied_specialization').clearValidators();
          this.studentProfile.get('other_reason_for_applied_specialization').updateValueAndValidity();
        }

      }
    );
    this.studentProfile.controls.student_not_join.valueChanges.subscribe(
      (value: string) => {
if(value && value==="Others"){
  this.studentProfile
            .get('other_reason_for_student_not_join')
            .setValidators([Validators.required]);
          this.studentProfile.get('other_reason_for_student_not_join').updateValueAndValidity();
        } else {
          this.studentProfile.get('other_reason_for_student_not_join').clearValidators();
          this.studentProfile.get('other_reason_for_student_not_join').updateValueAndValidity();
        }

      }
    );


    this.studentProfile.controls.specialization.valueChanges.subscribe(
      (value: string) => {
if(value){
  this._specializationCheckMandatory(value);}
}

    );
    this.studentProfile.controls.applied_specific_colleges.valueChanges.subscribe(
      (value: string) => {
        if(value){
        this._appliedCollegesCheckMandatory(value);}}
    );
    this.studentProfile.controls.joining_college.valueChanges.subscribe(
      (value: string) => {
        if(value && value==="No"){
  this.studentProfile
            .get('student_not_join')
            .setValidators([Validators.required]);
          this.studentProfile.get('student_not_join').updateValueAndValidity();
          this.studentProfile
            .get('student_not_join')
            .setValidators([Validators.required]);
          this.studentProfile.get('student_not_join').updateValueAndValidity();
        }
        else {
          this._joiningCollegeValidation();
        }

      }
    );
    this.studentProfile.controls.student_not_join.valueChanges.subscribe(
      (value: string) => {
if(value?.length && value==="Others"){
  this.studentProfile
            .get('other_reason_for_student_not_join')
            .setValidators([Validators.required]);
          this.studentProfile.get('other_reason_for_student_not_join').updateValueAndValidity();
        } else {
          this.studentProfile.get('other_reason_for_student_not_join').clearValidators();
          this.studentProfile.get('other_reason_for_student_not_join').updateValueAndValidity();
        }

      }
    );
    this.studentProfile.controls.repeated_entrance_exam.valueChanges.subscribe(
      (value: string) => {
if(value && value==="Others"){
  this.studentProfile
            .get('other_reason_for_repeated_entrance_exam')
            .setValidators([Validators.required]);
          this.studentProfile.get('other_reason_for_repeated_entrance_exam').updateValueAndValidity();
        } else {
          this.studentProfile.get('other_reason_for_repeated_entrance_exam').clearValidators();
          this.studentProfile.get('other_reason_for_repeated_entrance_exam').updateValueAndValidity();
        }

      }
    );


    this.studentProfile.controls.College_name?.valueChanges.subscribe(
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
    this.studentProfile.controls.student_not_join?.valueChanges.subscribe(
      (value: string) => {
        if (value==="Waiting for counselling") {
          this.studentProfile
            .get('reason_for_not_apply_counselling')
            .setValidators([Validators.required]);
          this.studentProfile.get('reason_for_not_apply_counselling').updateValueAndValidity();
          this.studentProfile.get('reason_for_not_applying_entrance_exam').clearValidators();
          this.studentProfile.get('reason_for_not_applying_entrance_exam').updateValueAndValidity();
        } else if (value==="Waiting for Entrance results"){
          this.studentProfile
          .get('reason_for_not_applying_entrance_exam')
          .setValidators([Validators.required]);
        this.studentProfile.get('reason_for_not_applying_entrance_exam').updateValueAndValidity();
          this.studentProfile.get('reason_for_not_apply_counselling').clearValidators();
          this.studentProfile.get('reason_for_not_apply_counselling').updateValueAndValidity();
        }
        else{
          this.studentProfile.get('reason_for_not_applying_entrance_exam').clearValidators();
          this.studentProfile.get('reason_for_not_applying_entrance_exam').updateValueAndValidity();
          this.studentProfile.get('reason_for_not_apply_counselling').clearValidators();
          this.studentProfile.get('reason_for_not_apply_counselling').updateValueAndValidity();
        }
      }
    );

    this.studentProfile.controls.is_Applied_College.valueChanges.subscribe(
      (value: string) => {
        if (value && value === 'Yes' && this.studentProfile.get('joining_college')?.value==='No') {
          this.studentProfile
          .get('applied_specific_colleges')
          .setValidators([Validators.required]);
        this.studentProfile.get('applied_specific_colleges').updateValueAndValidity();
          this.studentProfile
          .get('Written_Entrance_Exam')
          .setValidators([Validators.required]);
        this.studentProfile.get('Written_Entrance_Exam').updateValueAndValidity();
        this.studentProfile
          .get('Waiting_for_Counselling')
          .setValidators([Validators.required]);
        this.studentProfile.get('Waiting_for_Counselling').updateValueAndValidity();
          this.studentProfile.get('other_reason_for_student_not_apply').clearValidators();
          this.studentProfile.get('other_reason_for_student_not_apply').updateValueAndValidity();

        }
        else if(value && value === 'No'){
          this.studentProfile
          .get('other_reason_for_student_not_apply')
          .setValidators([Validators.required]);
        this.studentProfile.get('other_reason_for_student_not_apply').updateValueAndValidity();
        this.studentProfile.get('Written_Entrance_Exam').clearValidators();
        this.studentProfile.get('Written_Entrance_Exam').updateValueAndValidity();
        this.studentProfile.get('Waiting_for_Counselling').clearValidators();
        this.studentProfile.get('Waiting_for_Counselling').updateValueAndValidity();
        this.studentProfile.get('applied_specific_colleges').clearValidators();
        this.studentProfile.get('applied_specific_colleges').updateValueAndValidity();
        }
      }
    );
    this.studentProfile.controls.other_reason_for_student_not_apply.valueChanges.subscribe(
      (value: string) => {
        if (value && value === 'Repeating Entrance exam') {
          this.studentProfile
            .get('repeated_entrance_exam')
            .setValidators([Validators.required]);
          this.studentProfile.get('repeated_entrance_exam').updateValueAndValidity();
          this.studentProfile
          .get('other_reason_for_repeated_entrance_exam')
          .clearValidators();
        this.studentProfile.get('other_reason_for_repeated_entrance_exam').updateValueAndValidity();
        }
        else if(value==="Others"){
          this.studentProfile
          .get('other_reason_for_student_not_apply_data')
          .setValidators([Validators.required]);
        this.studentProfile.get('other_reason_for_student_not_apply_data').updateValueAndValidity();
        this.studentProfile.get('repeated_entrance_exam').clearValidators();
        this.studentProfile.get('repeated_entrance_exam').updateValueAndValidity();

        }
        else {
          this.studentProfile
          .get('other_reason_for_repeated_entrance_exam')
          .clearValidators();
        this.studentProfile.get('other_reason_for_repeated_entrance_exam').updateValueAndValidity();
          this.studentProfile.get('repeated_entrance_exam').clearValidators();
        this.studentProfile.get('repeated_entrance_exam').updateValueAndValidity();
        }
      }
    );
    this.studentProfile.controls.Written_Entrance_Exam.valueChanges.subscribe(
      (value: string) => {
        if (value[0] === 'Yes' && this.studentProfile.get('joining_college').value==='No') {
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
    this.studentProfile.controls.Exam_List.valueChanges.subscribe(
      (value: string) => {
        if (value[0] === 'Others' && this.studentProfile.get('joining_college').value==='No') {
          this.studentProfile
            .get('other_reason_exam_list')
            .setValidators([Validators.required]);
          this.studentProfile.get('other_reason_exam_list').updateValueAndValidity();
        } else {
          this.studentProfile.get('other_reason_exam_list').clearValidators();
          this.studentProfile.get('other_reason_exam_list').updateValueAndValidity();
        }
      }
    );
    this.studentProfile.controls.List_of_conselling.valueChanges.subscribe(
      (value: string) => {
        if (value === 'Others' && this.studentProfile.get('joining_college').value==='No') {
          this.studentProfile
            .get('other_reason_list_of_counselling')
            .setValidators([Validators.required]);
          this.studentProfile.get('other_reason_list_of_counselling').updateValueAndValidity();
        } else {
          this.studentProfile.get('other_reason_list_of_counselling').clearValidators();
          this.studentProfile.get('other_reason_list_of_counselling').updateValueAndValidity();
        }
      }
    );
    this.studentProfile.controls.Waiting_for_Counselling.valueChanges.subscribe(
      (value: string) => {
        if (value === 'Yes' && this.studentProfile.get('joining_college').value==='No') {
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
        debugger
        if (value === 'Yes') {
          this.studentProfile.get('is_Applied_College').clearValidators();
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
            .get('specialization')
            .setValidators([Validators.required]);
            this.studentProfile
            .get('joining_college')
            .setValidators([Validators.required]);

            this.studentProfile
            .get('is_Applied_College')
            .updateValueAndValidity();
          this.studentProfile
            .get('admission_district')
            .updateValueAndValidity();
          this.studentProfile.get('admission_course').updateValueAndValidity();
          this.studentProfile.get('admission_college').updateValueAndValidity();
          this.studentProfile
            .get('admission_college_type')
            .updateValueAndValidity();
            this.studentProfile
            .get('specialization')
            .updateValueAndValidity();
            this.studentProfile
            .get('joining_college')
            .updateValueAndValidity();

        } else {

          this.studentProfile.get('is_Applied_College').setValidators([Validators.required]);
          this.studentProfile.get('admission_district').clearValidators();
          this.studentProfile.get('admission_course').clearValidators();
          this.studentProfile.get('admission_college').clearValidators();
          this.studentProfile.get('admission_college_type').clearValidators();
          this.studentProfile.get('specialization').clearValidators();
          this.studentProfile.get('joining_college').clearValidators();
          this.studentProfile
            .get('admission_district')
            .updateValueAndValidity();
            this.studentProfile.get('is_Applied_College').updateValueAndValidity();
          this.studentProfile.get('admission_course').updateValueAndValidity();
          this.studentProfile.get('admission_college').updateValueAndValidity();
          this.studentProfile
            .get('admission_college_type')
            .updateValueAndValidity();
            this.studentProfile
            .get('specialization')
            .updateValueAndValidity();
            this.studentProfile
            .get('joining_college')
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
        admission_course: this.profileEditData.admission_course,
        gender:this.profileEditData.gender,
    other_reason_for_admission_college:this.profileEditData.other_reason_for_admission_college,
    specialization:this.profileEditData.specialization,
    other_reason_for_specialization:this.profileEditData.other_reason_for_specialization,
    joining_college:this.profileEditData.joining_college,
    student_not_join:this.profileEditData.student_not_join,
    other_reason_for_student_not_join:this.profileEditData.other_reason_for_student_not_join,
    repeated_entrance_exam:this.profileEditData.repeated_entrance_exam,
    other_reason_for_student_not_apply:this.profileEditData.other_reason_for_student_not_apply,
    other_reason_for_repeated_entrance_exam:this.profileEditData.other_reason_for_repeated_entrance_exam,
    other_reason_for_student_not_apply_data:this.profileEditData.other_reason_for_student_not_apply_data,
    applied_specific_colleges:this.profileEditData.applied_specific_colleges,
    applied_college_district:this.profileEditData.applied_college_district,
    applied_college:this.profileEditData.applied_college,
    applied_course:this.profileEditData.applied_course,
    applied_college_type:this.profileEditData.applied_college_type,
    other_reason_for_applied_college:this.profileEditData.other_reason_for_applied_college,
    applied_course_specialization:this.profileEditData.applied_course_specialization,
    other_reason_for_applied_specialization:this.profileEditData.other_reason_for_applied_specialization
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
      debugger
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
      if(this.studentProfile.get('joining_college')?.value==='Yes'){
        this._saveForm();
      }
      else{
        localStorage.setItem(
          'studentDetail',
          JSON.stringify(this.studentProfile.value)
        );
        this._router.navigate(['/survey/solution-provided']);
      }

    }
  }

  public onClickBack(): void {
    this._router.navigate(['/survey/alumni2022']);
  }

  private _studentDataBasedOnRegisterNumber(value: string): void {
    this.filteredData = this.studentData.find(
      (data: any) => data.emis_id === value
    );
    if (this.filteredData) {
      this.studentProfile.patchValue({
        Phone_Number: this.filteredData.mobile,
        Register_Number: this.filteredData.Register_Number,
        Name: this.filteredData.name,
        Group: this.filteredData.Group_subjects,
        total_marks: this.filteredData.total_marks,
        Result: this.filteredData.Result,
        gender:this.filteredData.gender==="F"?"Female":"Male",
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

  private _admissionCollgeTypeCheckMandatory(value:any):void{
    if(value.length && value[0]==="Others"){
      this.studentProfile
        .get('other_reason_for_admission_college')
        .setValidators([Validators.required]);
      this.studentProfile.get('other_reason_for_admission_college').updateValueAndValidity();
    } else {
      this.studentProfile.get('other_reason_for_admission_college').clearValidators();
      this.studentProfile.get('other_reason_for_admission_college').updateValueAndValidity();
    }

  }
  private _specializationCheckMandatory(value:any):void{
    if(value.length && value==="Others"){
      this.studentProfile
        .get('other_reason_for_specialization')
        .setValidators([Validators.required]);
      this.studentProfile.get('other_reason_for_specialization').updateValueAndValidity();
    } else {
      this.studentProfile.get('other_reason_for_specialization').clearValidators();
      this.studentProfile.get('other_reason_for_specialization').updateValueAndValidity();
    }

  }

  public _appliedCollegesCheckMandatory(value:string):void{
    if (value === 'Yes' && (this.studentProfile.get('Got_Admission')?.value==='Yes' && this.studentProfile.get('joining_college')?.value==='No' || this.studentProfile.get('Got_Admission')?.value==='No' )) {
      this.studentProfile
        .get('applied_college_district')
        .setValidators([Validators.required]);
      this.studentProfile
        .get('applied_course')
        .setValidators([Validators.required]);
      this.studentProfile
        .get('applied_college')
        .setValidators([Validators.required]);
      this.studentProfile
        .get('applied_college_type')
        .setValidators([Validators.required]);
        this.studentProfile
        .get('applied_course_specialization')
        .setValidators([Validators.required]);
        this.studentProfile

        this.studentProfile
        .updateValueAndValidity();
      this.studentProfile
        .get('applied_college_district')
        .updateValueAndValidity();
      this.studentProfile.get('applied_course').updateValueAndValidity();
      this.studentProfile.get('applied_college').updateValueAndValidity();
      this.studentProfile
        .get('applied_college_type')
        .updateValueAndValidity();
        this.studentProfile
        .get('applied_course_specialization')
        .updateValueAndValidity();

    } else {
      this.studentProfile
      .get('applied_college_district')
      .clearValidators()
    this.studentProfile
      .get('applied_course')
      .clearValidators()
    this.studentProfile
      .get('applied_college')
      .clearValidators()
    this.studentProfile
      .get('applied_college_type')
      .clearValidators()
      this.studentProfile
      .get('applied_course_specialization')
      .clearValidators()

      this.studentProfile
      .updateValueAndValidity();
    this.studentProfile
      .get('applied_college_district')
      .updateValueAndValidity();
    this.studentProfile.get('applied_course').updateValueAndValidity();
    this.studentProfile.get('applied_college').updateValueAndValidity();
    this.studentProfile
      .get('applied_college_type')
      .updateValueAndValidity();
      this.studentProfile
      .get('applied_course_specialization')
      .updateValueAndValidity();
    }
  }

  private _saveForm():void {
    const profileFormValue = JSON.parse(
      localStorage.getItem('profileFormValue') as any
    );

    const {
      Register_Number,
      EMIS_number,
      Name,
      Phone_Number,
      Current_Contact_Number,
      Current_Whatsapp_Number,
      Alternative_Number,
      Location,
      Taluk,
      District,
      pincode,
      Group,
      total_marks,
      Result,
      HSC_Passout_Year,
      medium,
      is_Applied_College,
      Reason_Not_Apply,
      Written_Entrance_Exam,
      List_of_conselling,
      Waiting_for_Counselling,
      Exam_List,
      Got_Admission,
      admission_college,
      admission_district,
      admission_college_type,
      admission_course,
      gender,
      other_reason_for_admission_college,
      specialization,
      other_reason_for_specialization,
      joining_college,
      student_not_join,
      other_reason_for_student_not_join,
      repeated_entrance_exam,
      other_reason_for_student_not_apply,
      other_reason_for_repeated_entrance_exam,
      other_reason_for_student_not_apply_data,
      applied_specific_colleges,

      applied_college_district,
      applied_college,
      applied_course,
      applied_college_type,
      other_reason_for_applied_college,
      applied_course_specialization,
      other_reason_for_applied_specialization,

    } = this.studentProfile.value;

    let payload = {
      ...profileFormValue,
      Register_Number,
      EMIS_number,
      Name,
      Phone_Number,
      Current_Contact_Number,
      Current_Whatsapp_Number,
      Alternative_Number,
      Location,
      Taluk,
      District,
      pincode,
      Group,
      total_marks,
      Result,
      HSC_Passout_Year,
      medium,
      is_Applied_College,
      Reason_Not_Apply,
      Written_Entrance_Exam,
      List_of_conselling: List_of_conselling?List_of_conselling.toString():'',
      Waiting_for_Counselling,
      Exam_List: Exam_List?Exam_List.toString():'',
      Got_Admission,
      admission_college,
      admission_district,
      admission_college_type: admission_college_type?admission_college_type.toString():'',
      admission_course,
      gender,
      other_reason_for_admission_college,
      specialization:specialization?specialization.toString():'',
      other_reason_for_specialization,
      joining_college,
      student_not_join,
      other_reason_for_student_not_join,
      repeated_entrance_exam,
      other_reason_for_student_not_apply,
      other_reason_for_repeated_entrance_exam,
      other_reason_for_student_not_apply_data,
      applied_specific_colleges,
      applied_college_district,
      applied_college,
      applied_course,
      applied_college_type:applied_college_type?applied_college_type.toString():'',
      other_reason_for_applied_college,
      applied_course_specialization:applied_course_specialization?applied_course_specialization.toString():'',
      other_reason_for_applied_specialization,

    };
    this._commonService
      .postService('/add_student_details', payload)
      .subscribe((res: any) => {
        if (res.status == 200) {
          $('#successModal').modal('show');
          localStorage.removeItem('solutionFormData');
          localStorage.removeItem('profileFormValue');
          localStorage.removeItem('studentDetail');
          localStorage.removeItem('udise_code');
        }
      });
  }

  toBack() {
    //this._location.back();
    this._router.navigate(['/survey/alumni2022']);
  }
private _joiningCollegeValidation():void{
  debugger

    this.studentProfile.get('student_not_join').clearValidators();
    this.studentProfile.get('other_reason_for_student_not_join').clearValidators();
    this.studentProfile.get('repeated_entrance_exam').clearValidators();
    this.studentProfile.get('other_reason_for_student_not_apply').clearValidators();
    this.studentProfile.get('other_reason_for_repeated_entrance_exam').clearValidators();
    this.studentProfile.get('other_reason_for_student_not_apply_data').clearValidators();
  this.studentProfile.get('applied_specific_colleges').clearValidators();
  this.studentProfile.get('applied_college_district').clearValidators();
  this.studentProfile.get('applied_college').clearValidators();
  this.studentProfile.get('applied_course').clearValidators();
  this.studentProfile.get('applied_college_type').clearValidators();
  this.studentProfile.get('other_reason_for_applied_college').clearValidators();
  this.studentProfile.get('applied_course_specialization').clearValidators();
  this.studentProfile.get('other_reason_for_applied_specialization').clearValidators();
  this.studentProfile.get('student_not_join').updateValueAndValidity();
  this.studentProfile.get('other_reason_for_student_not_join').updateValueAndValidity();
  this.studentProfile.get('repeated_entrance_exam').updateValueAndValidity();
  this.studentProfile.get('other_reason_for_student_not_apply').updateValueAndValidity();
  this.studentProfile.get('other_reason_for_repeated_entrance_exam').updateValueAndValidity();
  this.studentProfile.get('other_reason_for_student_not_apply_data').updateValueAndValidity();
  this.studentProfile.get('applied_specific_colleges').updateValueAndValidity();
  this.studentProfile.get('applied_college_district').updateValueAndValidity();
this.studentProfile.get('applied_college').updateValueAndValidity();
this.studentProfile.get('applied_course').updateValueAndValidity();
this.studentProfile.get('applied_college_type').updateValueAndValidity();
this.studentProfile.get('other_reason_for_applied_college').updateValueAndValidity();
this.studentProfile.get('applied_course_specialization').updateValueAndValidity();
this.studentProfile.get('other_reason_for_applied_specialization').updateValueAndValidity();
  this.studentProfile.get('reason_for_not_applying_entrance_exam').clearValidators();
  this.studentProfile.get('reason_for_not_applying_entrance_exam').updateValueAndValidity();
  this.studentProfile.get('reason_for_not_apply_counselling').clearValidators();
  this.studentProfile.get('reason_for_not_apply_counselling').updateValueAndValidity();
  this.studentProfile.get('student_not_join').clearValidators();
  this.studentProfile.get('student_not_join').updateValueAndValidity();
}
  }


