import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  public studentData:any[]=[]
  public filteredData:any;
  public registerNumbers:any[]=[];
  public districtData:any[]=[];

  studentProfile: any = this._formBuilder.group({
    Register_Number: ['', Validators.required],
    EMIS_number: ['', Validators.required],
    Name: ['', Validators.required],
    Phone_Number: ['',  [Validators.required, Validators.pattern("(0|91)?[6-9][0-9]{9}")]],
    Current_Contact_Number: ['',  [Validators.required, Validators.pattern("(0|91)?[6-9][0-9]{9}")]],
    Current_Whatsapp_Number: ['',  [Validators.required, Validators.pattern("(0|91)?[6-9][0-9]{9}")]],
    Alternative_Number: ['',  [Validators.required, Validators.pattern("(0|91)?[6-9][0-9]{9}")]],
    Location: ['', Validators.required],
    Taluk: ['', Validators.required],
    District: ['', Validators.required],
    pincode: ['', Validators.required],
    Group: ['', Validators.required],
    total_marks: ['', Validators.required],
    Result: ['', Validators.required],
    HSC_Passout_Year: ['', Validators.required],
    medium: ['', Validators.required],
    is_Applied_College: ['', Validators.required],
    Reason_Not_Apply:[''],
    Written_Entrance_Exam: ['', Validators.required],
    List_of_conselling:[''],
    Waiting_for_Counselling: ['', Validators.required],
    Exam_List:[''],
    Got_Admission: ['', Validators.required],
    admission_college: [''],
    admission_district: [''],
    admission_college_type: [''],
    Course: [''],
    College_name: [''],
    admission_course: [''],
    College_Type: [''],
    other_reason_list_of_counselling:[''],
    other_reason_exam_list:[''],
    other_reason_for_appplying_college:[]
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    public lang: LanguageService,
    private _router: Router,
    private _commonService:CommonService,
    private el: ElementRef
  ) {

  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.GetStudentDetails();
    this.studentProfile.controls.Register_Number.valueChanges.subscribe((value:string) => {
      debugger
     this._studentDataBasedOnRegisterNumber(value)
});
this.profileEditData = JSON.parse(
  localStorage.getItem('studentDetail') as string
);


    if (this.profileEditData) {
      this.studentProfile.patchValue({
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
        Reason_Not_Apply:this.profileEditData.Reason_Not_Apply,
        Written_Entrance_Exam: this.profileEditData.Written_Entrance_Exam,
        List_of_conselling:this.profileEditData.List_of_conselling,
        Waiting_for_Counselling: this.profileEditData.Waiting_for_Counselling,
        Exam_List:this.profileEditData.Exam_List,
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


  public GetStudentDetails():void{
    this._commonService
      .getService(`student_details`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.studentData = res.results;
          let data:any[]=[];
          let districtData:any[]=[];
  this.studentData.forEach((item:any)=>{
data.push(item.Register_Number)
districtData.push(item.District)
          }),
          this.registerNumbers=Array.from(new Set(data));
          this.districtData=Array.from(new Set(districtData));
        }
      });

  }

  public onClickNext(): void {
    this.submitted = true;

    if(this.studentProfile.invalid){
      for (const key of Object.keys(this.studentProfile.controls)) {
        if (this.studentProfile.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
  }
    }
   else {
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

  private _studentDataBasedOnRegisterNumber(value:string):void{
    debugger
    this.filteredData=this.studentData.find((data:any)=>data.Register_Number=== value)
    if(this.filteredData){
      this.studentProfile.patchValue({
        Phone_Number: this.filteredData.mobile,
        EMIS_number: this.filteredData.emis_id,
        Name: this.filteredData.name,
        Group: this.filteredData.Group_Name,
        total_marks: this.filteredData.total_marks,
        Result: this.filteredData.Result,
        //HSC_Passout_Year: this.filteredData.mobile,
        medium: this.filteredData.mobile==="E"?'English':"Tamil",
      });

    }
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
