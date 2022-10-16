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
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    firstGraduate: ['', Validators.required],
    studentMedium: ['', Validators.required],
    disability: ['', Validators.required],
    disabilitypercentage: [''],
    community: ['', Validators.required],
    trainRoute: ['', Validators.required],
    nearRailway: ['', Validators.required],
    busRoute: ['', Validators.required],
    nearBus: ['', Validators.required],
    singleParent: ['', Validators.required],
    //father: [''],
    mother: [''],
    fatherPhysical: [''],
    motherPhysical: [''],
    gaurdian: [''],
    gaurdianRelationship: [''],

    // studentHome: ['', Validators.required],
    fatherOccupation: ['', Validators.required],
    // fatherOccupationDetail: ['', ''],
    fatherQualification: ['', Validators.required],
    motherOccupation: ['', Validators.required],
    //motherOccupationDetail: ['', Validators.required],
    motherQualification: ['', Validators.required],
    //familyAnnualIncome: ['', ''],
    siblings: ['', Validators.required],
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
    if (this.userDetails) {
      this.profileInfoFormGroup.patchValue({
        fullName: this.userDetails.student_name,
        emsId: this.userDetails.student_id,
        gender: this.userDetails.gender === 1 ? 'Male' : 'Female',
      });
    }
    if (this.profileEditData) {
      debugger;
      (this.disblilityValue = this.profileEditData.disability),
        (this.singleParentModel = this.profileEditData.singleParent);
      this.selected = this.profileEditData.fatherPhysical;
      this.selected1 = this.profileEditData.motherPhysical;
      this.siblingsValue = this.profileEditData.siblings;
      this.disabilitypercentageValue =
        this.profileEditData.disabilitypercentage;
      this.profileInfoFormGroup.patchValue({
        dob: this.profileEditData.dob,
        firstGraduate: this.profileEditData.firstGraduate,
        studentMedium: this.profileEditData.studentMedium,
        disability: this.profileEditData.disability,
        disabilitypercentage: this.profileEditData.disabilitypercentage,
        community: this.profileEditData.community,
        trainRoute: this.profileEditData.trainRoute,
        nearRailway: this.profileEditData.nearRailway,
        busRoute: this.profileEditData.busRoute,
        nearBus: this.profileEditData.nearBus,
        singleParent: this.profileEditData.singleParent,
        mother: this.profileEditData.mother,
        fatherPhysical: this.profileEditData.fatherPhysical,
        motherPhysical: this.profileEditData.motherPhysical,
        gaurdian: this.profileEditData.gaurdian,
        gaurdianRelationship: this.profileEditData.gaurdianRelationship,
        fatherOccupation: this.profileEditData.fatherOccupation,
        fatherQualification: this.profileEditData.fatherQualification,
        motherOccupation: this.profileEditData.motherOccupation,
        motherQualification: this.profileEditData.motherQualification,
        siblings: this.profileEditData.siblings,
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
      this._router.navigate(['/student/academic']);
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
    if (item === 'sibilings') {
      var inp = parseInt(event);
      // Allow numbers, alpahbets, space, underscore
      if (0 <= inp && inp < 20) {
        return true;
      } else {
        this.profileInfoFormGroup.controls['siblings'].reset();
        this.siblingsValue = '';
        return true;
      }
    } else {
      var inp = parseInt(event);
      // Allow numbers, alpahbets, space, underscore
      if (0 < inp && inp < 100) {
        return true;
      } else {
        this.profileInfoFormGroup.controls['disabilitypercentage'].reset();
        this.disabilitypercentageValue = '';
        return true;
      }
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
