import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../shared/services/common/language.service';
import { CommonService } from '../../../../shared/services/common/common.service';

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.scss'],
})
export class SurveyReportComponent implements OnInit {

  public userDetails: any;
  public reportData: any;  
  public fromdate: any;
  public todate: any;
  public emsId : string;
  public fullName : string;
  public medium : string;
  public location : string;
  public fatherOccupation : string;
  public fatherEducation : string;
  public motherEducationalQualification : string;
  public sibilings : string;
  public user_name : string;
  public intrestedSubject : string;
  public pursueHigherEducation : string;
  public IntrestedCourse : string;
  public IntrestedCollege : string;
  public worriedAboutCollege : string;
  public worriedAboutFees : string;
  public higherEducationAwayFromHometown : string;
  public challengesInHigherEducation : string;
  public specilaztions : string;
  public specilaztionsCourses : string;
  public entranceExams : string;
  public interestedForStudy : string;
  public preferJob : string;
  public interestedGoverementJobs : string;
  public interestedSectors : string;
  public isImage = false;
  public isData = true;

  constructor(public lang: LanguageService,private _commonService: CommonService) {}

  ngOnInit(): void {

    this.userDetails = JSON.parse(
      localStorage.getItem('userDetails') as string
    );
    // console.log("dsds");
    this.userDetails.student_id;
    console.log(this.userDetails.student_id);
    const url = `http://naanmudhalvantest.com/api/survey?emsId=${this.userDetails.student_id}`
    this._commonService.otherGetService(url).subscribe((res: any) => {
          if (res.status == 200) {
            this.reportData = res;      
            // console.log(this.reportData);
            // console.log(this.reportData.results[0].emsId);
                if(this.reportData.results == ""){
                  // console.log(this.reportData);
                    this.isImage = true;
                    this.isData = false;
                }
                else
                {
                  this.isImage = false;
                  this.isData = true;

                   if(this.reportData.results[0].emsId !="" && this.reportData.results[0].emsId != null)
                   {
                    this.emsId = this.reportData.results[0].emsId;
                    }
                    else{
                      this.emsId = "---"; 
                    }
                   if(this.reportData.results[0].fullName !="" && this.reportData.results[0].fullName != null)
                   {
                    this.fullName = this.reportData.results[0].fullName;
                    }
                    else{
                      this.fullName = "---"; 
                    }
                   if(this.reportData.results[0].medium !="" && this.reportData.results[0].medium != null)
                   {
                    this.medium = this.reportData.results[0].medium;
                    }
                    else{
                      this.medium = "---"; 
                    }
                   if(this.reportData.results[0].location !="" && this.reportData.results[0].location != null)
                   {
                    this.location = this.reportData.results[0].location;
                    }
                    else{
                      this.location = "---"; 
                    }
                   if(this.reportData.results[0].fatherOccupation !="" && this.reportData.results[0].fatherOccupation != null)
                   {
                    this.fatherOccupation = this.reportData.results[0].fatherOccupation;
                    }
                    else{
                      this.fatherOccupation = "---"; 
                    }
                   if(this.reportData.results[0].fatherEducation !="" && this.reportData.results[0].fatherEducation != null)
                   {
                    this.fatherEducation = this.reportData.results[0].fatherEducation;
                    }
                    else{
                      this.fatherEducation = "---"; 
                    }
                   if(this.reportData.results[0].motherEducationalQualification !="" && this.reportData.results[0].motherEducationalQualification != null)
                   {
                    this.motherEducationalQualification = this.reportData.results[0].motherEducationalQualification;
                    }
                    else{
                      this.motherEducationalQualification = "---"; 
                    }
                   if(this.reportData.results[0].sibilings !="" && this.reportData.results[0].sibilings != null)
                   {
                    this.sibilings = this.reportData.results[0].sibilings;
                    }
                    else{
                      this.sibilings = "---"; 
                    }
                   if(this.reportData.results[0].user_name !="" && this.reportData.results[0].user_name != null)
                   {
                    this.user_name = this.reportData.results[0].user_name;
                    }
                    else{
                      this.user_name = "---"; 
                    }
                   if(this.reportData.results[0].intrestedSubject !="" && this.reportData.results[0].intrestedSubject != null)
                   {
                    this.intrestedSubject = this.reportData.results[0].intrestedSubject;
                    }
                    else{
                      this.intrestedSubject = "---"; 
                    }
                   if(this.reportData.results[0].pursueHigherEducation !="" && this.reportData.results[0].pursueHigherEducation != null)
                   {
                    this.pursueHigherEducation = this.reportData.results[0].pursueHigherEducation;
                    }
                    else{
                      this.pursueHigherEducation = "---"; 
                    }
                   if(this.reportData.results[0].IntrestedCourse !="" && this.reportData.results[0].IntrestedCourse != null)
                   {
                    this.IntrestedCourse = this.reportData.results[0].IntrestedCourse;
                    }
                    else{
                      this.IntrestedCourse = "---"; 
                    }
                   if(this.reportData.results[0].IntrestedCollege !="" && this.reportData.results[0].IntrestedCollege != null)
                   {
                    this.IntrestedCollege = this.reportData.results[0].IntrestedCollege;
                    }
                    else{
                      this.IntrestedCollege = "---"; 
                    }
                   if(this.reportData.results[0].worriedAboutCollege !="" && this.reportData.results[0].worriedAboutCollege != null)
                   {
                    this.worriedAboutCollege = this.reportData.results[0].worriedAboutCollege;
                    }
                    else{
                      this.worriedAboutCollege = "---"; 
                    }
                   if(this.reportData.results[0].worriedAboutFees !="" && this.reportData.results[0].worriedAboutFees != null)
                   {
                    this.worriedAboutFees = this.reportData.results[0].worriedAboutFees;
                    }
                    else{
                      this.worriedAboutFees = "---"; 
                    }
                   if(this.reportData.results[0].higherEducationAwayFromHometown !="" && this.reportData.results[0].higherEducationAwayFromHometown != null)
                   {
                    this.higherEducationAwayFromHometown = this.reportData.results[0].higherEducationAwayFromHometown;
                    }
                    else{
                      this.higherEducationAwayFromHometown = "---"; 
                    }
                   if(this.reportData.results[0].challengesInHigherEducation !="" && this.reportData.results[0].challengesInHigherEducation != null)
                   {
                    this.challengesInHigherEducation = this.reportData.results[0].challengesInHigherEducation;
                    }
                    else{
                      this.challengesInHigherEducation = "---"; 
                    }
                   if(this.reportData.results[0].specilaztions !="" && this.reportData.results[0].specilaztions != null)
                   {
                    this.specilaztions = this.reportData.results[0].specilaztions;
                    }
                    else{
                      this.specilaztions = "---"; 
                    }
                   if(this.reportData.results[0].specilaztionsCourses !="" && this.reportData.results[0].specilaztionsCourses != null)
                   {
                    this.specilaztionsCourses = this.reportData.results[0].specilaztionsCourses;
                    }
                    else{
                      this.specilaztionsCourses = "---"; 
                    }
                   if(this.reportData.results[0].entranceExams !="" && this.reportData.results[0].entranceExams != null)
                   {
                    this.entranceExams = this.reportData.results[0].entranceExams;
                    }
                    else{
                      this.entranceExams = "---"; 
                    }
                   if(this.reportData.results[0].interestedForStudy !="" && this.reportData.results[0].interestedForStudy != null)
                   {
                    this.interestedForStudy = this.reportData.results[0].interestedForStudy;
                    }
                    else{
                      this.interestedForStudy = "---"; 
                    }
                   if(this.reportData.results[0].preferJob !="" && this.reportData.results[0].preferJob != null)
                   {
                    this.preferJob = this.reportData.results[0].preferJob;
                    }
                    else{
                      this.preferJob = "---"; 
                    }
                   if(this.reportData.results[0].interestedGoverementJobs !="" && this.reportData.results[0].interestedGoverementJobs != null)
                   {
                    this.interestedGoverementJobs = this.reportData.results[0].interestedGoverementJobs;
                    }
                    else{
                      this.interestedGoverementJobs = "---"; 
                    }
                   if(this.reportData.results[0].interestedSectors !="" && this.reportData.results[0].interestedSectors != null)
                   {
                    this.interestedSectors = this.reportData.results[0].interestedSectors;
                    }
                    else{
                      this.interestedSectors = "---"; 
                    }
                }
          }
    });

  }

  datefilter(){

    const dateurl=`http://43.204.33.103/api/survey?emsId=${this.userDetails.student_id}&from=${this.fromdate}&to=${this.todate}`;
    this._commonService.otherGetService(dateurl).subscribe((res: any) => {
          if (res.status == 200) {
            this.reportData = res;      
            // console.log(this.reportData);
            // console.log(this.reportData.results[0].emsId);
            if(this.reportData.results == ""){
              // console.log(this.reportData);
                this.isImage = true;
                this.isData = false;
            }
            else
            {
              this.isImage = false;
              this.isData = true;
                   if(this.reportData.results[0].emsId !="" && this.reportData.results[0].emsId != null)
                   {
                    this.emsId = this.reportData.results[0].emsId;
                    }
                    else{
                      this.emsId = "---"; 
                    }
                   if(this.reportData.results[0].fullName !="" && this.reportData.results[0].fullName != null)
                   {
                    this.fullName = this.reportData.results[0].fullName;
                    }
                    else{
                      this.fullName = "---"; 
                    }
                   if(this.reportData.results[0].medium !="" && this.reportData.results[0].medium != null)
                   {
                    this.medium = this.reportData.results[0].medium;
                    }
                    else{
                      this.medium = "---"; 
                    }
                   if(this.reportData.results[0].location !="" && this.reportData.results[0].location != null)
                   {
                    this.location = this.reportData.results[0].location;
                    }
                    else{
                      this.location = "---"; 
                    }
                   if(this.reportData.results[0].fatherOccupation !="" && this.reportData.results[0].fatherOccupation != null)
                   {
                    this.fatherOccupation = this.reportData.results[0].fatherOccupation;
                    }
                    else{
                      this.fatherOccupation = "---"; 
                    }
                   if(this.reportData.results[0].fatherEducation !="" && this.reportData.results[0].fatherEducation != null)
                   {
                    this.fatherEducation = this.reportData.results[0].fatherEducation;
                    }
                    else{
                      this.fatherEducation = "---"; 
                    }
                   if(this.reportData.results[0].motherEducationalQualification !="" && this.reportData.results[0].motherEducationalQualification != null)
                   {
                    this.motherEducationalQualification = this.reportData.results[0].motherEducationalQualification;
                    }
                    else{
                      this.motherEducationalQualification = "---"; 
                    }
                   if(this.reportData.results[0].sibilings !="" && this.reportData.results[0].sibilings != null)
                   {
                    this.sibilings = this.reportData.results[0].sibilings;
                    }
                    else{
                      this.sibilings = "---"; 
                    }
                   if(this.reportData.results[0].user_name !="" && this.reportData.results[0].user_name != null)
                   {
                    this.user_name = this.reportData.results[0].user_name;
                    }
                    else{
                      this.user_name = "---"; 
                    }
                   if(this.reportData.results[0].intrestedSubject !="" && this.reportData.results[0].intrestedSubject != null)
                   {
                    this.intrestedSubject = this.reportData.results[0].intrestedSubject;
                    }
                    else{
                      this.intrestedSubject = "---"; 
                    }
                   if(this.reportData.results[0].pursueHigherEducation !="" && this.reportData.results[0].pursueHigherEducation != null)
                   {
                    this.pursueHigherEducation = this.reportData.results[0].pursueHigherEducation;
                    }
                    else{
                      this.pursueHigherEducation = "---"; 
                    }
                   if(this.reportData.results[0].IntrestedCourse !="" && this.reportData.results[0].IntrestedCourse != null)
                   {
                    this.IntrestedCourse = this.reportData.results[0].IntrestedCourse;
                    }
                    else{
                      this.IntrestedCourse = "---"; 
                    }
                   if(this.reportData.results[0].IntrestedCollege !="" && this.reportData.results[0].IntrestedCollege != null)
                   {
                    this.IntrestedCollege = this.reportData.results[0].IntrestedCollege;
                    }
                    else{
                      this.IntrestedCollege = "---"; 
                    }
                   if(this.reportData.results[0].worriedAboutCollege !="" && this.reportData.results[0].worriedAboutCollege != null)
                   {
                    this.worriedAboutCollege = this.reportData.results[0].worriedAboutCollege;
                    }
                    else{
                      this.worriedAboutCollege = "---"; 
                    }
                   if(this.reportData.results[0].worriedAboutFees !="" && this.reportData.results[0].worriedAboutFees != null)
                   {
                    this.worriedAboutFees = this.reportData.results[0].worriedAboutFees;
                    }
                    else{
                      this.worriedAboutFees = "---"; 
                    }
                   if(this.reportData.results[0].higherEducationAwayFromHometown !="" && this.reportData.results[0].higherEducationAwayFromHometown != null)
                   {
                    this.higherEducationAwayFromHometown = this.reportData.results[0].higherEducationAwayFromHometown;
                    }
                    else{
                      this.higherEducationAwayFromHometown = "---"; 
                    }
                   if(this.reportData.results[0].challengesInHigherEducation !="" && this.reportData.results[0].challengesInHigherEducation != null)
                   {
                    this.challengesInHigherEducation = this.reportData.results[0].challengesInHigherEducation;
                    }
                    else{
                      this.challengesInHigherEducation = "---"; 
                    }
                   if(this.reportData.results[0].specilaztions !="" && this.reportData.results[0].specilaztions != null)
                   {
                    this.specilaztions = this.reportData.results[0].specilaztions;
                    }
                    else{
                      this.specilaztions = "---"; 
                    }
                   if(this.reportData.results[0].specilaztionsCourses !="" && this.reportData.results[0].specilaztionsCourses != null)
                   {
                    this.specilaztionsCourses = this.reportData.results[0].specilaztionsCourses;
                    }
                    else{
                      this.specilaztionsCourses = "---"; 
                    }
                   if(this.reportData.results[0].entranceExams !="" && this.reportData.results[0].entranceExams != null)
                   {
                    this.entranceExams = this.reportData.results[0].entranceExams;
                    }
                    else{
                      this.entranceExams = "---"; 
                    }
                   if(this.reportData.results[0].interestedForStudy !="" && this.reportData.results[0].interestedForStudy != null)
                   {
                    this.interestedForStudy = this.reportData.results[0].interestedForStudy;
                    }
                    else{
                      this.interestedForStudy = "---"; 
                    }
                   if(this.reportData.results[0].preferJob !="" && this.reportData.results[0].preferJob != null)
                   {
                    this.preferJob = this.reportData.results[0].preferJob;
                    }
                    else{
                      this.preferJob = "---"; 
                    }
                   if(this.reportData.results[0].interestedGoverementJobs !="" && this.reportData.results[0].interestedGoverementJobs != null)
                   {
                    this.interestedGoverementJobs = this.reportData.results[0].interestedGoverementJobs;
                    }
                    else{
                      this.interestedGoverementJobs = "---"; 
                    }
                   if(this.reportData.results[0].interestedSectors !="" && this.reportData.results[0].interestedSectors != null)
                   {
                    this.interestedSectors = this.reportData.results[0].interestedSectors;
                    }
                    else{
                      this.interestedSectors = "---"; 
                    }
            }
          }
    });


  }
}
