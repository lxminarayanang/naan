import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common/common.service';
import { JsondataService } from '@shared/services/common/jsondata.service';
import { LanguageService } from '@shared/services/common/language.service';
declare var $: any;
@Component({
  selector: 'app-scholarship-form',
  templateUrl: './scholarship-form.component.html',
  styleUrls: ['./scholarship-form.component.scss']
})
export class ScholarshipFormComponent implements OnInit {
  regForm: any;
  submitted = true;

  constructor(
    private router: Router,
    private _location: Location,
    private fb: FormBuilder,
    public service: CommonService,
    public lang: LanguageService,
    public jsondata: JsondataService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.regFormFunc();
  }

  regFormFunc(): void {
    this.regForm = this.fb.group({
      organizationName: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      mobileNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactPersonName: [null, Validators.required],
      contactPersonDesignation: [null, Validators.required],
      district: [null, Validators.required],
      scholarshipDetails: [null, Validators.required],
      ableToProvideNoOfStudents: [null, Validators.required],
      address: [null, Validators.required],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      eligibilityCriteria: [null, Validators.required],
      applicationDeadline: [null, Validators.required],
    });
  }

  get f() { return this.regForm.controls; }

  submitForm() {
    this.submitted = true;
    if (this.regForm.invalid) {
      return;
    }
    this.service.postService("/forms/scholar", this.regForm.value).subscribe((res: any) => {
      if (res.status == 200) {
        $('#successModal').modal('show')
      }
    })
  }

  toBack() {
    this._location.back()
  }
  resetForm() {
    this.regForm.reset()
  }
}
