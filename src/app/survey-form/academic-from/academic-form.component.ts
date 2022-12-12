import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/services/common/language.service';
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

  academicInfoForm: any = this._formBuilder.group({
    mostIntrestedSubject: ['', Validators.required],
    leastInterestedSubject: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    public lang: LanguageService,
    private _router: Router
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.userDetails = JSON.parse(
      localStorage.getItem('userDetails') as string
    );
    this.profileEditData = JSON.parse(
      localStorage.getItem('academicFormValue') as string
    );
    if (this.userDetails) {
      this.academicInfoForm.patchValue({
        school: this.userDetails.school_name,
      });
    }
    if (this.profileEditData) {
      this.academicInfoForm.patchValue({
        mostIntrestedSubject: this.profileEditData.mostIntrestedSubject,
        leastInterestedSubject: this.profileEditData.leastInterestedSubject,
      });
    }
  }

  public onClickNext(): void {
    this.submitted = true;
    if (this.academicInfoForm.valid) {
      localStorage.setItem(
        'academicFormValue',
        JSON.stringify(this.academicInfoForm.value)
      );
      //this._router.navigate[('')]
      this._router.navigate(['/student/career']);
    }
  }
  public onClickBack(): void {
    this._router.navigate(['/student/profile']);
  }
}
