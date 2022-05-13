"use strict";(self.webpackChunkfe_tn_schools=self.webpackChunkfe_tn_schools||[]).push([[579],{5579:(I,m,r)=>{r.r(m),r.d(m,{ScholarshipFormModule:()=>J});var s=r(9808),c=r(1083),n=r(3075),e=r(5e3),g=r(8128),u=r(2159),d=r(1714);function p(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function f(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function h(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function Z(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function q(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function b(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function _(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function T(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function x(o,i){if(1&o&&(e.TgZ(0,"option",55),e._uU(1),e.qZA()),2&o){const t=i.$implicit;e.Q6J("value",null==t?null:t.district_name),e.xp6(1),e.AsE(" ",null==t?null:t.id,".",null==t?null:t.district_name,"")}}function v(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function A(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function C(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}function F(o,i){if(1&o&&(e.TgZ(0,"small",54),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Oqu(t.lang.language.fieldRequired)}}const N=[{path:"",component:(()=>{class o{constructor(t,l,a,O,k,U){this.router=t,this._location=l,this.fb=a,this.service=O,this.lang=k,this.jsondata=U,this.submitted=!1}ngOnInit(){window.scrollTo(0,0),this.regFormFunc()}regFormFunc(){this.regForm=this.fb.group({organizationName:[null,n.kI.required],email:[null,n.kI.compose([n.kI.required,n.kI.email])],mobileNumber:[null,[n.kI.required,n.kI.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],contactPersonName:[null,n.kI.required],contactPersonDesignation:[null,n.kI.required],district:[null,n.kI.required],scholarshipDetails:[null,n.kI.required],ableToProvideNoOfStudents:[null,n.kI.required],address:[null,n.kI.required],pincode:[null,[n.kI.required,n.kI.pattern("^[0-9]{6}$")]],eligibilityCriteria:[null,n.kI.required],applicationDeadline:[null,n.kI.required]})}get f(){return this.regForm.controls}submitForm(){this.submitted=!0,!this.regForm.invalid&&this.service.postService("/forms/scholar",this.regForm.value).subscribe(t=>{200==t.status&&(this.submitted=!1,$("#successModal").modal("show"))})}toBack(){this._location.back()}resetForm(){this.regForm.reset()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(c.F0),e.Y36(s.Ye),e.Y36(n.qu),e.Y36(g.v),e.Y36(u.T),e.Y36(d.S))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-scholarship-form"]],decls:82,vars:30,consts:[[1,"container-fluid","mt-4rem","pt-2"],[1,"d-flex","justify-content-center","mt-5"],["src","/assets/images/icons/rupee.png",1,"h-50"],[1,"d-flex","justify-content-center","mt-3"],[1,"section-header"],[1,"container","mt-3",3,"formGroup"],[1,"justify-content-between","align-items-center"],[1,"row"],[1,"col-sm-12","col-md-12","col-lg-6","col-xl-6","d-flex","justify-content-center"],["src","/assets/images/banner/mentor.png",1,"img-radius","me-5","vh-66"],[1,"w-100"],[1,"mb-4"],["type","text","maxlength","45","formControlName","organizationName",1,"form-control",3,"placeholder"],["class","error-small-msg",4,"ngIf"],["type","email","maxlength","45","formControlName","email",1,"form-control",3,"placeholder"],["type","text","maxlength","45","formControlName","contactPersonName",1,"form-control",3,"placeholder"],["type","text","maxlength","45","formControlName","contactPersonDesignation",1,"form-control",3,"placeholder"],["type","number","formControlName","mobileNumber",1,"form-control",3,"placeholder"],[1,"mt-4"],[1,"row","d-flex","justify-content-evenly","px-5"],[1,"col-sm-12","col-md-12","col-lg-8","col-xl-8"],[1,"mb-3"],["type","text","maxlength","150","formControlName","address",1,"form-control",3,"placeholder"],[1,"col-sm-12","col-md-12","col-lg-4","col-xl-4"],["type","number","formControlName","pincode",1,"form-control",3,"placeholder"],[1,"row","px-5"],[1,"col-sm-12","col-md-12","col-lg-12","col-xl-12","d-flex","justify-content-center"],["type","text","maxlength","150","formControlName","scholarshipDetails",1,"form-control",3,"placeholder"],[1,"row","d-flex","justify-content-evenly","pb-2","pt-3","px-5"],[1,"col-sm-12","col-md-12","col-lg-5","col-xl-5"],["id","disabledSelect","formControlName","district",1,"form-select"],["value","null","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],[1,"col-sm-12","col-md-12","col-lg-7","col-xl-7"],["type","text","maxlength","50","formControlName","ableToProvideNoOfStudents",1,"form-control",3,"placeholder"],[1,"row","px-5","pb-4"],[1,"col-sm-12","col-md-12","col-lg-7","col-xl-7","d-flex","justify-content-center"],["type","text","maxlength","150","formControlName","eligibilityCriteria",1,"form-control",3,"placeholder"],[1,"col-sm-12","col-md-12","col-lg-5","col-xl-5","d-flex","justify-content-center"],["formControlName","applicationDeadline","min","2022-03-01","max","2022-12-31","type","text","onfocus","(this.type='date')","onblur","(this.type='text')",1,"form-control",3,"placeholder"],[1,"text-center","pb-4"],[1,"btn","me-3","btn-secondary",3,"click"],[1,"btn","me-3","btn-danger",3,"click"],[1,"btn","btn-success",3,"click"],["id","successModal","data-bs-backdrop","static","data-bs-keyboard","false","tabindex","-1","aria-labelledby","successModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered"],[1,"modal-content","br-20"],[1,"text-end","pe-3","pt-2"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close",3,"click"],[1,"modal-body","text-center"],[1,"d-flex","justify-content-center","pb-2"],["src","/assets/images/icons/rupee.png","height","60"],[1,"d-blue","pb-2"],[1,"pb-3"],[1,"error-small-msg"],[3,"value"]],template:function(t,l){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._UZ(2,"img",2),e.qZA(),e.TgZ(3,"div",3),e.TgZ(4,"h3",4),e._uU(5),e.qZA(),e.qZA(),e.qZA(),e.TgZ(6,"div",5),e.TgZ(7,"div",6),e.TgZ(8,"div",7),e.TgZ(9,"div",8),e._UZ(10,"img",9),e.qZA(),e.TgZ(11,"div",8),e.TgZ(12,"div",10),e.TgZ(13,"div",11),e._UZ(14,"input",12),e.YNc(15,p,2,1,"small",13),e.qZA(),e.TgZ(16,"div",11),e._UZ(17,"input",14),e.YNc(18,f,2,1,"small",13),e.qZA(),e.TgZ(19,"div",11),e._UZ(20,"input",15),e.YNc(21,h,2,1,"small",13),e.qZA(),e.TgZ(22,"div",11),e._UZ(23,"input",16),e.YNc(24,Z,2,1,"small",13),e.qZA(),e.TgZ(25,"div",11),e._UZ(26,"input",17),e.YNc(27,q,2,1,"small",13),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(28,"div",18),e.TgZ(29,"div",19),e.TgZ(30,"div",20),e.TgZ(31,"div",21),e._UZ(32,"input",22),e.YNc(33,b,2,1,"small",13),e.qZA(),e.qZA(),e.TgZ(34,"div",23),e.TgZ(35,"div",21),e._UZ(36,"input",24),e.YNc(37,_,2,1,"small",13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(38,"div",25),e.TgZ(39,"div",26),e._UZ(40,"input",27),e.YNc(41,T,2,1,"small",13),e.qZA(),e.qZA(),e.TgZ(42,"div",28),e.TgZ(43,"div",29),e.TgZ(44,"div",21),e.TgZ(45,"select",30),e.TgZ(46,"option",31),e._uU(47),e.qZA(),e.YNc(48,x,2,3,"option",32),e.qZA(),e.YNc(49,v,2,1,"small",13),e.qZA(),e.qZA(),e.TgZ(50,"div",33),e.TgZ(51,"div",21),e._UZ(52,"input",34),e.YNc(53,A,2,1,"small",13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(54,"div",35),e.TgZ(55,"div",36),e._UZ(56,"input",37),e.YNc(57,C,2,1,"small",13),e.qZA(),e.TgZ(58,"div",38),e._UZ(59,"input",39),e.TgZ(60,"div"),e.YNc(61,F,2,1,"small",13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(62,"div",40),e.TgZ(63,"button",41),e.NdJ("click",function(){return l.toBack()}),e._uU(64),e.qZA(),e.TgZ(65,"button",42),e.NdJ("click",function(){return l.resetForm()}),e._uU(66),e.qZA(),e.TgZ(67,"button",43),e.NdJ("click",function(){return l.submitForm()}),e._uU(68),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(69,"div",44),e.TgZ(70,"div",45),e.TgZ(71,"div",46),e.TgZ(72,"div",47),e.TgZ(73,"button",48),e.NdJ("click",function(){return l.toBack()}),e.qZA(),e.qZA(),e.TgZ(74,"div",49),e.TgZ(75,"div",50),e._UZ(76,"img",51),e.qZA(),e.TgZ(77,"h1",52),e._uU(78,"Thank You!"),e.qZA(),e.TgZ(79,"div",53),e.TgZ(80,"h6"),e._uU(81,"You will be contacted in 2 weeks"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(5),e.Oqu(l.lang.language.scholarFormTitle),e.xp6(1),e.Q6J("formGroup",l.regForm),e.xp6(8),e.Q6J("placeholder",l.lang.language.orgName),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.organizationName.errors),e.xp6(2),e.Q6J("placeholder",l.lang.language.email),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.email.errors),e.xp6(2),e.Q6J("placeholder",l.lang.language.contactPersonName),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.contactPersonName.errors),e.xp6(2),e.Q6J("placeholder",l.lang.language.contactPersonDesignation),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.contactPersonDesignation.errors),e.xp6(2),e.Q6J("placeholder",l.lang.language.mobileNumber),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.mobileNumber.errors),e.xp6(5),e.Q6J("placeholder",l.lang.language.orgAddress),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.address.errors),e.xp6(3),e.Q6J("placeholder",l.lang.language.pincode),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.pincode.errors),e.xp6(3),e.Q6J("placeholder",l.lang.language.scholarshipDetails),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.scholarshipDetails.errors),e.xp6(6),e.Oqu(l.lang.language.orgDistrict),e.xp6(1),e.Q6J("ngForOf",l.jsondata.districts),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.district.errors),e.xp6(3),e.Q6J("placeholder",l.lang.language.ableToProvideNoOfStudents),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.ableToProvideNoOfStudents.errors),e.xp6(3),e.Q6J("placeholder",l.lang.language.orgEligibility),e.xp6(1),e.Q6J("ngIf",l.submitted&&l.f.eligibilityCriteria.errors),e.xp6(2),e.Q6J("placeholder",l.lang.language.applicationDeadline),e.xp6(2),e.Q6J("ngIf",l.submitted&&l.f.applicationDeadline.errors),e.xp6(3),e.Oqu(l.lang.language.back),e.xp6(2),e.Oqu(l.lang.language.reset),e.xp6(2),e.Oqu(l.lang.language.submit))},directives:[n.JL,n.sg,n.Fj,n.nD,n.JJ,n.u,s.O5,n.wV,n.EJ,n.YN,n.Kr,s.sg],styles:['.section-header[_ngcontent-%COMP%]{text-align:center;font-family:Roboto;font-style:normal;font-weight:800;font-size:1.5rem;line-height:1;color:#05396b;position:relative;display:inherit;margin-bottom:3rem}.section-header[_ngcontent-%COMP%]:after{content:"";background:#379683;height:.25rem;width:100%;position:absolute;bottom:0;top:2rem;left:0}.img-radius[_ngcontent-%COMP%]{height:350px;width:400px;border-radius:45px}.bg-blue[_ngcontent-%COMP%]{background:#e2ebff}.space[_ngcontent-%COMP%]{margin:0 2px 18px 29px}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{padding:12px!important}[_ngcontent-%COMP%]::placeholder, .form-control[_ngcontent-%COMP%], .form-select[_ngcontent-%COMP%]{color:#555353;opacity:1}.vh-66[_ngcontent-%COMP%]{height:66vh}']}),o})()}];let y=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[c.Bz.forChild(N)],c.Bz]}),o})();var S=r(108);let J=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[s.ez,y,S.m]]}),o})()}}]);