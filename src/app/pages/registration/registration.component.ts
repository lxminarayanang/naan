import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common/common.service';
import { JsondataService } from '@shared/services/common/jsondata.service';
import { LanguageService } from '@shared/services/common/language.service';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regForm: any;
  submitted = false;
  blocksList: any = [];
  schoolList: any = [];

  constructor(
    private router: Router,
    private _location: Location,
    private fb: FormBuilder,
    public lang: LanguageService,
    public service: CommonService,
    public jsondata: JsondataService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.regFormFunc();
  }

  regFormFunc(): void {
    this.regForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      mobileNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: [null, Validators.required],
      retypePassword: [null, Validators.required],
      dob: [null, Validators.required],
      district: [null, Validators.required],
      block: [null, Validators.required],
      school: [null, Validators.required],
      address: [null, Validators.required],
      pincode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      qualification: [null, Validators.required],
      occupation: [null, Validators.required],
      expYears: [null, Validators.required],
      interests: [null, Validators.required],
    });
  }

  get f() { return this.regForm.controls; }

  submitForm() {
    this.submitted = true;
    if (this.regForm.invalid) {
      return;
    }
    if (this.regForm.value.password != this.regForm.value.retypePassword) {
      return this.service.showToastr("Password is not same", 'error');
    }
    this.service.postService("/forms/mentor", this.regForm.value).subscribe((res: any) => {
      if (res.status == 200) {
        this.submitted=false;
        $('#successModal').modal('show')
      }
    })
  }

  resetForm() {
    this.regForm.reset()
  }
  toBack() {
    this._location.back()
  }

  fetchBlocks(d_name: any) {
    const d_details = this.jsondata.districts.filter((e: any) => {
      return e.district_name == d_name;
    });
    const d_id = d_details[0].id;
    this.blocksList = [];
    const url = `https://3axz1bt0bd.execute-api.ap-south-1.amazonaws.com/emisext-production/schoollist?code=2&districtId=${d_id}&blockId=0`
    this.service.otherGetService(url).subscribe((res: any) => {
      this.blocksList = res;
    })
  }
  fetchSchools(b_name: any) {
    const b_details = this.blocksList.filter((e: any) => {
      return e.block_name == b_name;
    });
    this.schoolList = [];
    const d_id = b_details[0].district_id;
    const b_id = b_details[0].block_id;
    const url = `https://3axz1bt0bd.execute-api.ap-south-1.amazonaws.com/emisext-production/schoollist?code=3&districtId=${d_id}&blockId=${b_id}`
    this.service.otherGetService(url).subscribe((res: any) => {
      this.schoolList = res
    })
  }
}
