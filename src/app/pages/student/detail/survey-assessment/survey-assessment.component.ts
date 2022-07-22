import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../shared/services/common/common.service';

@Component({
  selector: 'app-survey-assessment',
  templateUrl: './survey-assessment.component.html',
  styleUrls: ['./survey-assessment.component.scss'],
})
export class SurveyAssessmentComponent implements OnInit {
  public userDetails: any;
  public reportData: any;
  public fromdate: any;
  public todate: any;
  public emsId : string;
  public fullName : string;
  public dob : string;
  public gender : string;
  public firstGraduate : string;
  public medium : string;
  public disability : string;
  public community : string;
  public trainRoute : string;
  public nearRailway : string;
  public busRoute : string;
  public nearBus : string;
  public singleParent : string;
  public fatherPhysical : string;
  public fatherOccupation : string;
  public fatherEducation : string;
  public motheOccupationType : string;
  public motherEducationalQualification : string;
  public sibilings : string;
  public school : string;
  public hssGroupCode : string;
  public hosteller : string;
  public mediumInstruction : string;
  public govtSchool : string;
  public intrestedSubject : string;
  public courseIdea : string;
  public collegeIdea : string;
  public worriedAboutCollege : string;
  public worriedAboutFees : string;
  public graduationAwayFromHometown : string;
  public IntrestedHigherEducation : string;
  public appliedEntranceExam : string;
  public jobSector : string;
  public sectorInterested : string;
  public careerGuidance : string;
  public abroadCourse : string;
  public observationCommentOne : string;
  public isImage = false;
  public isData = true;

  constructor(private _commonService: CommonService) {}

  ngOnInit(): void {
    this.userDetails = JSON.parse(
      localStorage.getItem('userDetails') as string
    );
    // console.log("dsds");
    this.userDetails.student_id;
    console.log(this.userDetails.student_id);
    const url = `http://naanmudhalvantest.com/api/newsurvey?emsId=${this.userDetails.student_id}`
    this._commonService.otherGetService(url).subscribe((res: any) => {
          if (res.status == 200) {
            this.reportData = res;     
              if(this.reportData.results == ""){
                // console.log(this.reportData);
                  this.isImage = true;
                  this.isData = false;
              }
              else
              {
                console.log(this.reportData);
                this.isImage = false;
                this.isData = true;
                
                  if(this.reportData.results[0].emsId != "" && this.reportData.results[0].emsId != null)
                  {
                    this.emsId = this.reportData.results[0].emsId; 
                  }else{
                    this.emsId = "---";
                  }
                  if(this.reportData.results[0].fullName != "" && this.reportData.results[0].fullName != null)
                  {
                    this.fullName = this.reportData.results[0].fullName; 
                  }else{
                    this.fullName = "---";
                  }
                  if(this.reportData.results[0].dob != "" && this.reportData.results[0].dob != null)
                  {
                    this.dob = this.reportData.results[0].dob; 
                  }else{
                    this.dob = "---";
                  }
                  if(this.reportData.results[0].gender != "" && this.reportData.results[0].gender != null)
                  {
                    this.gender = this.reportData.results[0].gender; 
                  }else{
                    this.gender = "---";
                  }
                  if(this.reportData.results[0].firstGraduate != "" && this.reportData.results[0].firstGraduate != null)
                  {
                    this.firstGraduate = this.reportData.results[0].firstGraduate; 
                  }else{
                    this.firstGraduate = "---";
                  }
                  if(this.reportData.results[0].medium != "" && this.reportData.results[0].medium != null)
                  {
                    this.medium = this.reportData.results[0].medium; 
                  }else{
                    this.medium = "---";
                  }
                  if(this.reportData.results[0].disability != "" && this.reportData.results[0].disability != null)
                  {
                    this.disability = this.reportData.results[0].disability; 
                  }else{
                    this.disability = "---";
                  }
                  if(this.reportData.results[0].community != "" && this.reportData.results[0].community != null)
                  {
                    this.community = this.reportData.results[0].community; 
                  }else{
                    this.community = "---";
                  }
                  if(this.reportData.results[0].trainRoute != "" && this.reportData.results[0].trainRoute != null)
                  {
                    this.trainRoute = this.reportData.results[0].trainRoute; 
                  }else{
                    this.trainRoute = "---";
                  }
                  if(this.reportData.results[0].nearRailway != "" && this.reportData.results[0].nearRailway != null)
                  {
                    this.nearRailway = this.reportData.results[0].nearRailway; 
                  }else{
                    this.nearRailway = "---";
                  }
                  if(this.reportData.results[0].busRoute != "" && this.reportData.results[0].busRoute != null)
                  {
                    this.busRoute = this.reportData.results[0].busRoute; 
                  }else{
                    this.busRoute = "---";
                  }
                  if(this.reportData.results[0].nearBus != "" && this.reportData.results[0].nearBus != null)
                  {
                    this.nearBus = this.reportData.results[0].nearBus; 
                  }else{
                    this.nearBus = "---";
                  }
                  if(this.reportData.results[0].singleParent != "" && this.reportData.results[0].singleParent != null)
                  {
                    this.singleParent = this.reportData.results[0].singleParent; 
                  }else{
                    this.singleParent = "---";
                  }
                  if(this.reportData.results[0].fatherPhysical != "" && this.reportData.results[0].fatherPhysical != null)
                  {
                    this.fatherPhysical = this.reportData.results[0].fatherPhysical; 
                  }else{
                    this.fatherPhysical = "---";
                  }
                  if(this.reportData.results[0].fatherOccupation != "" && this.reportData.results[0].fatherOccupation != null)
                  {
                    this.fatherOccupation = this.reportData.results[0].fatherOccupation; 
                  }else{
                    this.fatherOccupation = "---";
                  }
                  if(this.reportData.results[0].fatherEducation != "" && this.reportData.results[0].fatherEducation != null)
                  {
                    this.fatherEducation = this.reportData.results[0].fatherEducation; 
                  }else{
                    this.fatherEducation = "---";
                  }
                  if(this.reportData.results[0].motheOccupationType != "" && this.reportData.results[0].motheOccupationType != null)
                  {
                    this.motheOccupationType = this.reportData.results[0].motheOccupationType; 
                  }else{
                    this.motheOccupationType = "---";
                  }
                  if(this.reportData.results[0].motherEducationalQualification != "" && this.reportData.results[0].motherEducationalQualification != null)
                  {
                    this.motherEducationalQualification = this.reportData.results[0].motherEducationalQualification; 
                  }else{
                    this.motherEducationalQualification = "---";
                  }
                  if(this.reportData.results[0].sibilings != "" && this.reportData.results[0].sibilings != null)
                  {
                    this.sibilings = this.reportData.results[0].sibilings; 
                  }else{
                    this.sibilings = "---";
                  }
                  if(this.reportData.results[0].school != "" && this.reportData.results[0].school != null)
                  {
                    this.school = this.reportData.results[0].school; 
                  }else{
                    this.school = "---";
                  }
                  if(this.reportData.results[0].hssGroupCode != "" && this.reportData.results[0].hssGroupCode != null)
                  {
                    this.hssGroupCode = this.reportData.results[0].hssGroupCode; 
                  }else{
                    this.hssGroupCode = "---";
                  }
                  if(this.reportData.results[0].hosteller != "" && this.reportData.results[0].hosteller != null)
                  {
                    this.hosteller = this.reportData.results[0].hosteller; 
                  }else{
                    this.hosteller = "---";
                  }
                  if(this.reportData.results[0].mediumInstruction != "" && this.reportData.results[0].mediumInstruction != null)
                  {
                    this.mediumInstruction = this.reportData.results[0].mediumInstruction; 
                  }else{
                    this.mediumInstruction = "---";
                  }
                  if(this.reportData.results[0].govtSchool != "" && this.reportData.results[0].govtSchool != null)
                  {
                    this.govtSchool = this.reportData.results[0].govtSchool; 
                  }else{
                    this.govtSchool = "---";
                  }
                  if(this.reportData.results[0].intrestedSubject != "" && this.reportData.results[0].intrestedSubject != null)
                  {
                    this.intrestedSubject = this.reportData.results[0].intrestedSubject; 
                  }else{
                    this.intrestedSubject = "---";
                  }
                  if(this.reportData.results[0].courseIdea != "" && this.reportData.results[0].courseIdea != null)
                  {
                    this.courseIdea = this.reportData.results[0].courseIdea; 
                  }else{
                    this.courseIdea = "---";
                  }
                  if(this.reportData.results[0].collegeIdea != "" && this.reportData.results[0].collegeIdea != null)
                  {
                    this.collegeIdea = this.reportData.results[0].collegeIdea; 
                  }else{
                    this.collegeIdea = "---";
                  }
                  if(this.reportData.results[0].worriedAboutCollege != "" && this.reportData.results[0].worriedAboutCollege != null)
                  {
                    this.worriedAboutCollege = this.reportData.results[0].worriedAboutCollege; 
                  }else{
                    this.worriedAboutCollege = "---";
                  }
                  if(this.reportData.results[0].worriedAboutFees != "" && this.reportData.results[0].worriedAboutFees != null)
                  {
                    this.worriedAboutFees = this.reportData.results[0].worriedAboutFees; 
                  }else{
                    this.worriedAboutFees = "---";
                  }
                  if(this.reportData.results[0].graduationAwayFromHometown != "" && this.reportData.results[0].graduationAwayFromHometown != null)
                  {
                    this.graduationAwayFromHometown = this.reportData.results[0].graduationAwayFromHometown; 
                  }else{
                    this.graduationAwayFromHometown = "---";
                  }
                  if(this.reportData.results[0].IntrestedHigherEducation != "" && this.reportData.results[0].IntrestedHigherEducation != null)
                  {
                    this.IntrestedHigherEducation = this.reportData.results[0].IntrestedHigherEducation; 
                  }else{
                    this.IntrestedHigherEducation = "---";
                  }
                  if(this.reportData.results[0].appliedEntranceExam != "" && this.reportData.results[0].appliedEntranceExam != null)
                  {
                    this.appliedEntranceExam = this.reportData.results[0].appliedEntranceExam; 
                  }else{
                    this.appliedEntranceExam = "---";
                  }
                  if(this.reportData.results[0].jobSector != "" && this.reportData.results[0].jobSector != null)
                  {
                    this.jobSector = this.reportData.results[0].jobSector; 
                  }else{
                    this.jobSector = "---";
                  }
                  if(this.reportData.results[0].sectorInterested != "" && this.reportData.results[0].sectorInterested != null)
                  {
                    this.sectorInterested = this.reportData.results[0].sectorInterested; 
                  }else{
                    this.sectorInterested = "---";
                  }
                  if(this.reportData.results[0].careerGuidance != "" && this.reportData.results[0].careerGuidance != null)
                  {
                    this.careerGuidance = this.reportData.results[0].careerGuidance; 
                  }else{
                    this.careerGuidance = "---";
                  }
                  if(this.reportData.results[0].abroadCourse != "" && this.reportData.results[0].abroadCourse != null)
                  {
                    this.abroadCourse = this.reportData.results[0].abroadCourse; 
                  }else{
                    this.abroadCourse = "---";
                  }
                  if(this.reportData.results[0].observationCommentOne != "" && this.reportData.results[0].observationCommentOne != null)
                  {
                    this.observationCommentOne = this.reportData.results[0].observationCommentOne; 
                  }else{
                    this.observationCommentOne = "---";
                  }
                }
            
          }
    });

  }
  datefilter(){
    
    // const url=`http://43.204.33.103/api/newsurvey?emsId=${this.userDetails.student_id}&from=${this.fromdate}&to=${this.todate}`;
    const dateurl=`http://43.204.33.103/api/newsurvey?emsId=${this.userDetails.student_id}&from=${this.fromdate}&to=${this.todate}`;
  
    console.log(dateurl);
    this._commonService.otherGetService(dateurl).subscribe((res: any) => {
          if (res.status == 200) {
            console.log(this.reportData);
            this.reportData = res;    
            if(this.reportData.results == ""){
              // console.log(this.reportData);
                this.isImage = true;
                this.isData = false;
            }
            else
            {  
              this.isImage = false;
              this.isData = true;

            // console.log(this.reportData);
            // console.log(this.reportData.results[0].emsId);
                  if(this.reportData.results[0].emsId != "" && this.reportData.results[0].emsId != null)
                  {
                    this.emsId = this.reportData.results[0].emsId; 
                  }else{
                    this.emsId = "---";
                  }
                  if(this.reportData.results[0].fullName != "" && this.reportData.results[0].fullName != null)
                  {
                    this.fullName = this.reportData.results[0].fullName; 
                  }else{
                    this.fullName = "---";
                  }
                  if(this.reportData.results[0].dob != "" && this.reportData.results[0].dob != null)
                  {
                    this.dob = this.reportData.results[0].dob; 
                  }else{
                    this.dob = "---";
                  }
                  if(this.reportData.results[0].gender != "" && this.reportData.results[0].gender != null)
                  {
                    this.gender = this.reportData.results[0].gender; 
                  }else{
                    this.gender = "---";
                  }
                  if(this.reportData.results[0].firstGraduate != "" && this.reportData.results[0].firstGraduate != null)
                  {
                    this.firstGraduate = this.reportData.results[0].firstGraduate; 
                  }else{
                    this.firstGraduate = "---";
                  }
                  if(this.reportData.results[0].medium != "" && this.reportData.results[0].medium != null)
                  {
                    this.medium = this.reportData.results[0].medium; 
                  }else{
                    this.medium = "---";
                  }
                  if(this.reportData.results[0].disability != "" && this.reportData.results[0].disability != null)
                  {
                    this.disability = this.reportData.results[0].disability; 
                  }else{
                    this.disability = "---";
                  }
                  if(this.reportData.results[0].community != "" && this.reportData.results[0].community != null)
                  {
                    this.community = this.reportData.results[0].community; 
                  }else{
                    this.community = "---";
                  }
                  if(this.reportData.results[0].trainRoute != "" && this.reportData.results[0].trainRoute != null)
                  {
                    this.trainRoute = this.reportData.results[0].trainRoute; 
                  }else{
                    this.trainRoute = "---";
                  }
                  if(this.reportData.results[0].nearRailway != "" && this.reportData.results[0].nearRailway != null)
                  {
                    this.nearRailway = this.reportData.results[0].nearRailway; 
                  }else{
                    this.nearRailway = "---";
                  }
                  if(this.reportData.results[0].busRoute != "" && this.reportData.results[0].busRoute != null)
                  {
                    this.busRoute = this.reportData.results[0].busRoute; 
                  }else{
                    this.busRoute = "---";
                  }
                  if(this.reportData.results[0].nearBus != "" && this.reportData.results[0].nearBus != null)
                  {
                    this.nearBus = this.reportData.results[0].nearBus; 
                  }else{
                    this.nearBus = "---";
                  }
                  if(this.reportData.results[0].singleParent != "" && this.reportData.results[0].singleParent != null)
                  {
                    this.singleParent = this.reportData.results[0].singleParent; 
                  }else{
                    this.singleParent = "---";
                  }
                  if(this.reportData.results[0].fatherPhysical != "" && this.reportData.results[0].fatherPhysical != null)
                  {
                    this.fatherPhysical = this.reportData.results[0].fatherPhysical; 
                  }else{
                    this.fatherPhysical = "---";
                  }
                  if(this.reportData.results[0].fatherOccupation != "" && this.reportData.results[0].fatherOccupation != null)
                  {
                    this.fatherOccupation = this.reportData.results[0].fatherOccupation; 
                  }else{
                    this.fatherOccupation = "---";
                  }
                  if(this.reportData.results[0].fatherEducation != "" && this.reportData.results[0].fatherEducation != null)
                  {
                    this.fatherEducation = this.reportData.results[0].fatherEducation; 
                  }else{
                    this.fatherEducation = "---";
                  }
                  if(this.reportData.results[0].motheOccupationType != "" && this.reportData.results[0].motheOccupationType != null)
                  {
                    this.motheOccupationType = this.reportData.results[0].motheOccupationType; 
                  }else{
                    this.motheOccupationType = "---";
                  }
                  if(this.reportData.results[0].motherEducationalQualification != "" && this.reportData.results[0].motherEducationalQualification != null)
                  {
                    this.motherEducationalQualification = this.reportData.results[0].motherEducationalQualification; 
                  }else{
                    this.motherEducationalQualification = "---";
                  }
                  if(this.reportData.results[0].sibilings != "" && this.reportData.results[0].sibilings != null)
                  {
                    this.sibilings = this.reportData.results[0].sibilings; 
                  }else{
                    this.sibilings = "---";
                  }
                  if(this.reportData.results[0].school != "" && this.reportData.results[0].school != null)
                  {
                    this.school = this.reportData.results[0].school; 
                  }else{
                    this.school = "---";
                  }
                  if(this.reportData.results[0].hssGroupCode != "" && this.reportData.results[0].hssGroupCode != null)
                  {
                    this.hssGroupCode = this.reportData.results[0].hssGroupCode; 
                  }else{
                    this.hssGroupCode = "---";
                  }
                  if(this.reportData.results[0].hosteller != "" && this.reportData.results[0].hosteller != null)
                  {
                    this.hosteller = this.reportData.results[0].hosteller; 
                  }else{
                    this.hosteller = "---";
                  }
                  if(this.reportData.results[0].mediumInstruction != "" && this.reportData.results[0].mediumInstruction != null)
                  {
                    this.mediumInstruction = this.reportData.results[0].mediumInstruction; 
                  }else{
                    this.mediumInstruction = "---";
                  }
                  if(this.reportData.results[0].govtSchool != "" && this.reportData.results[0].govtSchool != null)
                  {
                    this.govtSchool = this.reportData.results[0].govtSchool; 
                  }else{
                    this.govtSchool = "---";
                  }
                  if(this.reportData.results[0].intrestedSubject != "" && this.reportData.results[0].intrestedSubject != null)
                  {
                    this.intrestedSubject = this.reportData.results[0].intrestedSubject; 
                  }else{
                    this.intrestedSubject = "---";
                  }
                  if(this.reportData.results[0].courseIdea != "" && this.reportData.results[0].courseIdea != null)
                  {
                    this.courseIdea = this.reportData.results[0].courseIdea; 
                  }else{
                    this.courseIdea = "---";
                  }
                  if(this.reportData.results[0].collegeIdea != "" && this.reportData.results[0].collegeIdea != null)
                  {
                    this.collegeIdea = this.reportData.results[0].collegeIdea; 
                  }else{
                    this.collegeIdea = "---";
                  }
                  if(this.reportData.results[0].worriedAboutCollege != "" && this.reportData.results[0].worriedAboutCollege != null)
                  {
                    this.worriedAboutCollege = this.reportData.results[0].worriedAboutCollege; 
                  }else{
                    this.worriedAboutCollege = "---";
                  }
                  if(this.reportData.results[0].worriedAboutFees != "" && this.reportData.results[0].worriedAboutFees != null)
                  {
                    this.worriedAboutFees = this.reportData.results[0].worriedAboutFees; 
                  }else{
                    this.worriedAboutFees = "---";
                  }
                  if(this.reportData.results[0].graduationAwayFromHometown != "" && this.reportData.results[0].graduationAwayFromHometown != null)
                  {
                    this.graduationAwayFromHometown = this.reportData.results[0].graduationAwayFromHometown; 
                  }else{
                    this.graduationAwayFromHometown = "---";
                  }
                  if(this.reportData.results[0].IntrestedHigherEducation != "" && this.reportData.results[0].IntrestedHigherEducation != null)
                  {
                    this.IntrestedHigherEducation = this.reportData.results[0].IntrestedHigherEducation; 
                  }else{
                    this.IntrestedHigherEducation = "---";
                  }
                  if(this.reportData.results[0].appliedEntranceExam != "" && this.reportData.results[0].appliedEntranceExam != null)
                  {
                    this.appliedEntranceExam = this.reportData.results[0].appliedEntranceExam; 
                  }else{
                    this.appliedEntranceExam = "---";
                  }
                  if(this.reportData.results[0].jobSector != "" && this.reportData.results[0].jobSector != null)
                  {
                    this.jobSector = this.reportData.results[0].jobSector; 
                  }else{
                    this.jobSector = "---";
                  }
                  if(this.reportData.results[0].sectorInterested != "" && this.reportData.results[0].sectorInterested != null)
                  {
                    this.sectorInterested = this.reportData.results[0].sectorInterested; 
                  }else{
                    this.sectorInterested = "---";
                  }
                  if(this.reportData.results[0].careerGuidance != "" && this.reportData.results[0].careerGuidance != null)
                  {
                    this.careerGuidance = this.reportData.results[0].careerGuidance; 
                  }else{
                    this.careerGuidance = "---";
                  }
                  if(this.reportData.results[0].abroadCourse != "" && this.reportData.results[0].abroadCourse != null)
                  {
                    this.abroadCourse = this.reportData.results[0].abroadCourse; 
                  }else{
                    this.abroadCourse = "---";
                  }
                  if(this.reportData.results[0].observationCommentOne != "" && this.reportData.results[0].observationCommentOne != null)
                  {
                    this.observationCommentOne = this.reportData.results[0].observationCommentOne; 
                  }else{
                    this.observationCommentOne = "---";
                  }
                }
          }
      });
  }
}

