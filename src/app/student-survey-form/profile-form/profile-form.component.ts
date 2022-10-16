import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { LanguageService } from '../../shared/services/common/language.service';
declare var $: any;

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  selected: any;
  selected1: any;
  selectedList: any = [];

  illnessData: any[] = ['Physically ill', ' Mentally ill', ' Terminal illness'];
  illnessData1: any[] = [
    'Physically ill',
    ' Mentally ill',
    ' Terminal illness',
  ];
  physicalFatherSet = new Map();
  physicalMotherSet = new Map();
  filteredOptions: any[] = [];
  filteredOptions1: any[] = [];

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
  public singleParentModel: string = '';
  public disblilityValue: string = '';
  public today = new Date();
  public profileEditData: any;
  public submitted = false;
  public parentsData: any;
  public siblingsValue: any;
  public disabilitypercentageValue: any;

  profileInfoFormGroup: any = this._formBuilder.group({
    emsId: ['', Validators.required],
    fullName: ['', Validators.required],
    medium: ['', Validators.required],
    location: ['', Validators.required],
    fatherEducation: ['', Validators.required],
    // fatherOccupationDetail: ['', ''],
    fatherOccupation: ['', Validators.required],
    motheOccupationType: ['', Validators.required],
    //motherOccupationDetails: ['', Validators.required],
    motherEducationalQualification: ['', Validators.required],
    familyAnnualIncome: ['', ''],
    sibilings: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    public lang: LanguageService,
    private _router: Router
  ) {
    this.illnessData.forEach((item) => {
      this.physicalFatherSet.set(item, false);
    });
    this.illnessData1.forEach((item) => {
      this.physicalMotherSet.set(item, false);
    });

    this.filteredOptions = [...this.illnessData];
    this.filteredOptions1 = [...this.illnessData1];
  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.userDetails = JSON.parse(
      localStorage.getItem('userDetails') as string
    );
    this.profileEditData = JSON.parse(
      localStorage.getItem('profileFormValue') as string
    );
    // this.profileInfoFormGroup.patchValue({
    //   fullName: 'Muneeshkumar G',//this.userDetails.student_name,
    //   emsId: '4247284',//this.userDetails.student_id,
    //   medium: 'tamil',//this.userDetails.gender === 1 ? 'Male' : 'Female',
    // });
    if (this.userDetails) {
      this.profileInfoFormGroup.patchValue({
        fullName: this.userDetails.student_name,
        emsId: this.userDetails.student_id,
        gender: this.userDetails.gender === 1 ? 'Male' : 'Female',
      });
    }
    if (this.profileEditData) {
      debugger;
      this.siblingsValue = this.profileEditData.sibilings;
      this.profileInfoFormGroup.patchValue({
        medium: this.profileEditData.medium,
        location: this.profileEditData.location,
        mother: this.profileEditData.mother,
        fatherEducation: this.profileEditData.fatherEducation,
        fatherOccupation: this.profileEditData.fatherOccupation,
        motheOccupationType: this.profileEditData.motheOccupationType,
        motherEducationalQualification: this.profileEditData.motherEducationalQualification,
        sibilings: this.profileEditData.sibilings,
        familyAnnualIncome: this.profileEditData.familyAnnualIncome,
      });
    }
  }

  public onClickNext(): void {
    this.submitted = true;
    console.log(this.profileInfoFormGroup.value);
    if (this.profileInfoFormGroup.valid) {
      console.log(this.profileInfoFormGroup.value);
      localStorage.setItem(
        'profileFormValue',
        JSON.stringify(this.profileInfoFormGroup.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/survey/academic']);
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

  // keyPressNumericCharacters(event: any) {
  //   var inp = String.fromCharCode(event.keyCode);
  //   // Allow numbers, alpahbets, space, underscore
  //   if (/^[0-9]+(\.?[0-9]+)?$/.test(inp)) {
  //     return true;
  //   } else {
  //     event.preventDefault();
  //     return false;
  //   }
  // }
  keyPressNumericCharacter(event: any, item?: string) {
    debugger
      var inp = parseInt(event);
      // Allow numbers, alpahbets, space, underscore
      if (0 <= inp && inp < 20) {
        return true;
      } else {
        this.siblingsValue = '';
        return true;
      }
  }

  selectionChange($event: any) {
    this.physicalFatherSet.set(
      $event.option.value,
      !this.physicalFatherSet.get($event.option.value)
    );
    console.log(this.selected);
  }
  selectionChangeMother($event: any) {
    this.physicalMotherSet.set(
      $event.option.value,
      !this.physicalMotherSet.get($event.option.value)
    );
    console.log(this.selected1);
  }

  disabilityValueChange(disabilityValue: any) {
    debugger;
    if (disabilityValue === 'Yes') {
      this.profileInfoFormGroup
        .get('disabilitypercentage')
        .setValidators(Validators.required);
      //this.profileInfoFormGroup.controls.disabilitypercentage.setValidators([Validators.required]);
    }
  }
  parentVlueChanbeBasedOnParent(singleParentModel: string): void {
    if (singleParentModel === 'Single Parent') {
      this.profileInfoFormGroup
        .get('mother')
        .setValidators(Validators.required);
      //this.profileInfoFormGroup.controls.disabilitypercentage.setValidators([Validators.required]);
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
