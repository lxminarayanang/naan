import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common/common.service';
import { JsondataService } from '@shared/services/common/jsondata.service';
import { LanguageService } from '@shared/services/common/language.service';
declare var $: any;
@Component({
  selector: 'app-sponsar-form',
  templateUrl: './sponsar-form.component.html',
  styleUrls: ['./sponsar-form.component.scss']
})
export class SponsarFormComponent implements OnInit {
  regForm: any;
  submitted = false;
  blocksList: any = [];
  schoolList: any = [];
  // Payment Form
  PaymentForm:FormGroup

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
    this.initPaymentValidators()
  }

  regFormFunc(): void {
    this.regForm = this.fb.group({
      pancardName: [null, Validators.required],
      email: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      amount: [null, Validators.required],
      nationality: [null, Validators.required],
      district: [null],
      anyDistrict: [null],
      state: [null, Validators.required],
      country: [null, Validators.required],
      block: [null],
      school: [null],
      address: [null, Validators.required],
      pincode: [null, Validators.required],
      taxCertificate: ["false", Validators.required],
    });
  }

  get f() { return this.regForm.controls; }

  submitForm() {    
    this.submitted = true;
    if (this.regForm.invalid) {
      return;
    }
    this.service.postService("/forms/sponsor", this.regForm.value).subscribe((res: any) => {
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

  button()
  {
    $('#paymentModal').modal('show')

  }
  Payment()
  {
  if(this.PaymentForm.valid)
  {
    var records ={"records":{"total_amount":this.PaymentForm.value.total_amount,"udf1":this.regForm.value.mobileNumber,"udf2":"","udf3":"","user_id":this.regForm.value.mobileNumber,"con_id":""}}
  }
  }
  cancel()
  {
    $('#paymentModal').modal('hide')

  }

  initPaymentValidators()
  {
    this.PaymentForm = this.fb.group({
     
      total_amount:["",Validators.required],
      comments:["",Validators.required]
    
    })
  }
}
