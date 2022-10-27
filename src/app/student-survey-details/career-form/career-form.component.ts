import { Component, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
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
  public userDetails: any = {};
  public profileEditData: any;
  public submitted: boolean = false;
  public studentData: any[] = [];
  public filteredData: any;
  public selectedSolution: any[] = [];
  public scholorship: boolean = false;
  public counselling: boolean = false;
  public bankLoan: boolean = false;
  public spotAdmission: boolean = false;
  public districtData: any[] = [];
  public schoolDetails:any[]=[];

  solutionForm: FormGroup = new FormGroup({
    solution_provided: new FormControl('', Validators.required),
    Sponsor_name: new FormControl(''),
    Sponsor_type: new FormControl(''),
    Amount: new FormControl(''),
    Bank_Name: new FormControl(''),
    Branch: new FormControl(''),
    Spot_admission_College_Name: new FormControl(''),
    Spot_admission_Course: new FormControl(''),
    Spot_admission_College_Type: new FormControl(''),
    Spot_admission_College_District: new FormControl(''),
    Suggestion: new FormControl(''),
    Form_Filled_By: new FormControl(''),
    designation: new FormControl(''),
    other_reason_designation:new FormControl(''),
    User_Contact_Number: new FormControl('', [Validators.pattern("(0|91)?[6-9][0-9]{9}")]),
  });

  constructor(
    private _commonService: CommonService,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this._getStudentDetails();

    this.profileEditData = JSON.parse(
      localStorage.getItem('solutionFormData') as string
    );
    this.solutionForm.controls.solution_provided.valueChanges.subscribe((value: string) => {
      this.getType(value);
    });
    this.solutionForm.controls.designation.valueChanges.subscribe((value: string) => {
      if(value==='Others'){
        this.solutionForm
          .get('other_reason_designation')?.setValidators([Validators.required]);
        this.solutionForm.get('other_reason_designation')?.updateValueAndValidity();
      } else {
        this.solutionForm.get('other_reason_designation')?.clearValidators();
        this.solutionForm.get('other_reason_designation')?.updateValueAndValidity();
      }
    });

    if (this.profileEditData) {
      this.solutionForm.patchValue({
        solution_provided: this.profileEditData.solution_provided,
        Sponsor_name: this.profileEditData.Sponsor_name,
        Sponsor_type: this.profileEditData.Sponsor_type,
        Amount: this.profileEditData.Amount,
        Bank_Name: this.profileEditData.Bank_Name,
        Branch: this.profileEditData.Branch,
        College_Name: this.profileEditData.College_Name,
        Course: this.profileEditData.Course,
        College_Type: this.profileEditData.College_Type,
        District: this.profileEditData.District,
        Suggestion: this.profileEditData.Suggestion,
        Form_Filled_By: this.profileEditData.Form_Filled_By,
        User_Contact_Number: this.profileEditData.User_Contact_Number,
      });
    }
  }
  public onClickBack(): void {
    localStorage.setItem(
      'solutionFormData',
      JSON.stringify(this.solutionForm.value)
    );
    this._router.navigate(['/survey/profile']);
  }

  public toClose(): void {
    $('#alertModal').modal('close');
  }

  private _getStudentDetails(): void {
    this._commonService.getService(`/school_details`).subscribe((res: any) => {
      if (res.status == 200) {
        this.schoolDetails = res.results;
        this.schoolDetails.forEach((item:any)=>{
         this.districtData.push(item.District)
        })
        this.districtData=[...new Set(this.districtData)]
      }
    })
  }

  public onClickNext(): void {
    this.submitted = true;
    if (this.solutionForm.invalid) {
      for (const key of Object.keys(this.solutionForm.controls)) {
        if (this.solutionForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector(
            '[formcontrolname="' + key + '"]'
          );
          invalidControl.focus();
          break;
        }
      }
    } else {
      const profileFormValue = JSON.parse(
        localStorage.getItem('profileFormValue') as any
      );
      const studentDetail = JSON.parse(
        localStorage.getItem('studentDetail') as any
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
        joined_college,
        student_not_join_college,
        other_reason_for_student_not_join_college
      } = studentDetail;

      const {
        solution_provided,
        Sponsor_name,
        Sponsor_type,
        Amount,
        Bank_Name,
        Branch,
        Spot_admission_College_Name,
        Spot_admission_Course,
        Spot_admission_College_Type,
        Spot_admission_College_District,
        Suggestion,
        Form_Filled_By,
        designation,
        User_Contact_Number,
        other_reason_designation
      } = this.solutionForm.value;

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
        joined_college,
        student_not_join_college:student_not_join_college?student_not_join_college:'',
        other_reason_for_student_not_join_college,
        solution_provided:solution_provided?solution_provided.toString():'',
        Sponsor_name,
        Sponsor_type,
        Amount,
        Bank_Name,
        Branch,
        Spot_admission_College_Name,
        Spot_admission_Course,
        Spot_admission_College_Type: Spot_admission_College_Type?Spot_admission_College_Type.toString():'',
        Spot_admission_College_District,
        Suggestion,
        Form_Filled_By,
        User_Contact_Number,
        designation,
        other_reason_designation
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
  }

  public getType(item: any): void {
    if (item.length > 0) {
      this.scholorship = false;
      this.bankLoan = false;
      this.spotAdmission = false;
      this.counselling = false;
      item.forEach((element: string) => {
        if (element?.includes('Scholarship')) {
          this.scholorship = true;
        } else if (element?.includes('Bank Loan')) {
          this.bankLoan = true;
        } else if (element?.includes('Spot admission')) {
          this.spotAdmission = true;
        } else if (element?.includes('Family/ Personal Counselling')) {
          this.counselling = true;
        }
      });
    } else {
      this.scholorship = false;
      this.bankLoan = false;
      this.spotAdmission = false;
      this.counselling = false;
    }
  }

  toBack() {
    //this._location.back();
    this._router.navigate(['/survey/alumni2022']);
  }
  keyPressAlphaCharacters(event: any) {
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
