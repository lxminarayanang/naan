import { Component, ElementRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/services/common/language.service';
declare var $: any;

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  public userDetails: any = {};
  public profileEditData: any;
  public submitted = false;
  public siblingsValue: any;


  profileInfoFormGroup: any = this._formBuilder.group({
    emsId: ['', Validators.required],
    fullName: ['', Validators.required],
    homeLocation:['', Validators.required],
    //studentMedium:['', Validators.required],
    //fatherOccupation:[],
   // fatherOccupationDetail:[''],
    //fatherQualification:[],
   // motherOccupation:[],
   // motherOccupationDetail:[''],
   // motherQualification:[],
    //familyAnnualIncome:[''],
    //studiedSchoolType:['', Validators.required],
    siblings:['', Validators.required],
    udise:[],
    //residentialAddress:['', Validators.required],
    school_name:['', Validators.required],
    //school_location:['', Validators.required],
    phone_number:['', [Validators.pattern("(0|91)?[6-9][0-9]{9}")]],
    status_of_stay:['', Validators.required],
    //current_address:['', Validators.required],
    disability_status:['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    public lang: LanguageService,
    private _router: Router,
    private el: ElementRef
  ) {
  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.userDetails = JSON.parse(
      localStorage.getItem('userDetails') as string
    );

    this.profileEditData = JSON.parse(
      localStorage.getItem('profileFormValue') as string
    );

    if (this.userDetails) {
      this.profileInfoFormGroup.patchValue({
        fullName: this.userDetails.student_name,
        emsId: this.userDetails.emis_username,
        gender: this.userDetails.gender === 1 ? 'Male' : 'Female',
        udise: this.userDetails.udise_code,
        school_name:this.userDetails.school_name
      });
    }
    else{
      this._router.navigate(['/home']);
    }
    if (this.profileEditData) {
      this.siblingsValue = this.profileEditData.siblings;
      this.profileInfoFormGroup.patchValue({
        emsId: this.profileEditData.emsId,
        fullName: this.profileEditData.fullName,
        studentMedium:this.profileEditData.studentMedium,
        homeLocation:this.profileEditData.homeLocation,
        fatherOccupation:this.profileEditData.fatherOccupation,
        fatherOccupationDetail:this.profileEditData.fatherOccupationDetail,
        fatherQualification:this.profileEditData.fatherQualification,
        motherOccupation:this.profileEditData.motherOccupation,
        motherOccupationDetail:this.profileEditData.motherOccupationDetail,
        motherQualification:this.profileEditData.motherQualification,
        familyAnnualIncome:this.profileEditData.familyAnnualIncome,
        studiedSchoolType:this.profileEditData.studiedSchoolType,
        siblings:this.profileEditData.siblings,
        school_name:this.profileEditData.school_name,
        school_location:this.profileEditData.school_location,
        phone_number:this.profileEditData.phone_number,
        status_of_stay:this.profileEditData.status_of_stay,
        current_address:this.profileEditData.current_address,
        disability_status:this.profileEditData.disability_status,
       // residentialAddress:this.profileEditData.residentialAddress
      });
    }
  }

  public onClickNext(): void {
    this.submitted = true;
    if(this.profileInfoFormGroup.invalid){
      for (const key of Object.keys(this.profileInfoFormGroup.controls)) {
        if (this.profileInfoFormGroup.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
  }

   else {
      localStorage.setItem(
        'profileFormValue',
        JSON.stringify(this.profileInfoFormGroup.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/career']);
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

  keyPressNumericCharacters(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/^[0-9]+(\.?[0-9]+)?$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressNumericCharacter(event: any, item?: string) {

      var inp = parseInt(event);
      // Allow numbers, alpahbets, space, underscore
      if (0 <= inp && inp < 20) {
        return true;
      } else {
        this.profileInfoFormGroup.controls['siblings'].reset();
        this.siblingsValue = '';
        return true;
      }
  }


}

export class CustomValidator {
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };

    return null;
  }
}
