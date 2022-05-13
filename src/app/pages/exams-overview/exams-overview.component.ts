import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@shared/services/common/common.service';
import { LanguageService } from '@shared/services/common/language.service';

@Component({
  selector: 'app-exams-overview',
  templateUrl: './exams-overview.component.html',
  styleUrls: ['./exams-overview.component.scss'],
})
export class ExamsOverviewComponent implements OnInit {
  collapse: boolean[] = [];
  param_id: any;
  section: any;
  bannerTitle: string = '';
  sideHeadings: any[] = [];
  items: any;
  badge1: any = '';
  badge2: any = '';
  badge3: any = '';
  selectedMenu: any;
  language: any = '';
  noData: any = 'No data found';
  public pageTitle: boolean = false;
  public generalDetails: any;
  public colleges: any;
  ImportantDates : string = ''
  graduate : string = '';
  public currentUrl:any;

  constructor(
    private location: Location,
    private _Activatedroute: ActivatedRoute,
    public service: CommonService,
    public lang: LanguageService,
    private _location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
    this.currentUrl=this.router.url;
    this.pageTitle = this.router.url.includes('courses');
   
    this.language = localStorage.getItem('language');
    
    this.section = this._Activatedroute.snapshot.paramMap.get('id1');
    //  this.section = this.section.charAt(0).toUpperCase() + this.section.slice(1);
    this.param_id = this._Activatedroute.snapshot.paramMap.get('id2');
    this.fetchRecord(this.section, this.param_id);

    this.lang.events$.forEach((event) => {
      const myArray = this.router.url.split('/');
      let word = myArray[2];
      if ('categories' == word) {
        this._location.back();
      }
    });
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this._location.back();
  }
  public onClickRedirection(): void {
    this.location.back();
  }
  moveTo() {
    this.location.back();
  }
  goToUrl(url: any): void {
    window.open('https://'+`${url}`, '_blank');
  }
  fetchRecord(section: any, id: any) {
    this.service
      .getService(`/${section}` + `?id=${id}`)
      .subscribe((res: any) => {
        if (!res.results) {
          return;
        }
        this.items = res.results;
        if (this.section === 'ccourses') {
          this.colleges = this.items.colleges.filter(
            (item: any) => item.state === 'Tamil Nadu'
          );
        }
        this.bannerTitle = this.items?.name || '';
        this.badge1 =
          this.section === 'colleges'
            ? this.items?.collegeType
            : this.items?.level;
        this.badge2 = this.items?.field || '';
        this.badge3 = this.items?.endDate || '';
        this.generalDetails = this.items.generalDetails;
        this.ImportantDates = this.items?.importantDates;
        this.graduate = this.items?.graduate;

        if (this.language == 'english') {
          switch (section) {
            case 'scholarships':
              this.sideHeadings = [
                {
                  title: 'General Information',
                  content: this.items.generalDetails || this.noData,
                },
                {
                  title: 'Eligibility',
                  content: this.items.eligibility || this.noData,
                },
                {
                  title: 'Documents required',
                  content: this.items.requirements || this.noData,
                },
              ];
              break;

            case 'careers':
              this.sideHeadings = [
                {
                  title: 'Brief Details',
                  content: this.items.generalDetails || this.noData,
                },
                {
                  title: 'Educational Requirements',
                  content: this.items.requirements || this.noData,
                },
                {
                  title: 'Aptitude and Skills Needed',
                  content: this.items.aptitudeSkills || this.noData,
                },
                {
                  title: 'Career Advancement',
                  content: this.items.requirements || this.noData,
                },
                {
                  title: 'Job Opportuinities',
                  content: this.items.jobs || this.noData,
                },
              ];
              break;

            case 'exams':
              this.sideHeadings = [
                { title: "General Information", content: this.items.generalDetails || this.noData },
              { title: "Exam Language", content: this.items.language || this.noData },
              { title: "Eligibility", content: this.items.eligibility || this.noData },
              { title: "Available Seats", content: this.items.seats || this.noData },
              { title: "Exam Pattern", content: this.items.pattern || this.noData },         
              { title: "Application Fees", content: this.items.fees || this.noData },
              { title: "Link To Download Q/A", content: this.items.linktodownload || this.noData },
              { title: "Application Procedure", content: this.items.procedure || this.noData },
              ];
              break;

            case 'courses':
              this.sideHeadings = [
                {
                  title: 'Brief About the Course ',
                  content: this.items.generalDetails || this.noData,
                },
                {
                  title: 'Course Duration ',
                  content: this.items.duration || this.noData,
                },
                {
                  title: 'Entrance Exams ',
                  content: this.items.entanceExams || this.noData,
                },
                {
                  title: 'Job Opportuinities ',
                  content: this.items.jobs || this.noData,
                },
                {
                  title: 'Higher Education ',
                  content: this.items.higherEducation || this.noData,
                },
              ];
              break;
          }
        }

        // Tamil language
        if (this.language == 'tamil') {
          switch (section) {
            case 'scholarships':
              this.sideHeadings = [
                {
                  title: 'உதவித் தொகை  பற்றிய சுருக்கமான அறிமுகம்',
                  content: this.items.generalDetails || this.noData,
                },
                {
                  title: ' உதவித்தொகைக்கான  தகுதி',
                  content: this.items.eligibility || this.noData,
                },
                {
                  title: 'தேவையான ஆவணங்கள்',
                  content: this.items.requirements || this.noData,
                },
              ];
              break;

            case 'careers':
              this.sideHeadings = [
                {
                  title: 'குறுகிய விளக்கம் ',
                  content: this.items.generalDetails || this.noData,
                },
                {
                  title: 'கல்வித் தகுதி ',
                  content: this.items.requirements || this.noData,
                },
                {
                  title: 'தேவையான திறன்கள்',
                  content: this.items.aptitudeSkills || this.noData,
                },
                {
                  title: 'பணிசார் முன்னேற்றம்',
                  content: this.items.requirements || this.noData,
                },
                {
                  title: 'வேலை வாய்ப்புகள் ',
                  content: this.items.jobs || this.noData,
                },
              ];
              break;

            case 'exams':
              this.sideHeadings = [
                {
                  title: 'General Information',
                  content: this.items.generalDetails || this.noData,
                },
                { 
                  title: "Exam Language", 
                content: this.items.language || this.noData 
                },
                {
                  title: 'Eligibility',
                  content: this.items.eligibility || this.noData,
                },
                {
                  title: 'Available Seats',
                  content: this.items.seats || this.noData,
                },
                {
                  title: 'Exam Pattern',
                  content: this.items.pattern || this.noData,
                },
                
                {
                  title: 'Application Fees',
                  content: this.items.fees || this.noData,
                },
                { 
                  title: "Link To Download Q/A", 
                  content: this.items.linktodownload || this.noData 
                },
                {
                  title: 'Application Procedure',
                  content: this.items.procedure || this.noData,
                },
              ];
              break;

            case 'courses':
              this.sideHeadings = [
                {
                  title: 'படிப்பு பற்றிய சுருக்கமான அறிமுகம்',
                  content: this.items.generalDetails || this.noData,
                },
                {
                  title: 'படிப்புக் காலம் ',
                  content: this.items.duration || this.noData,
                },
                {
                  title: 'நுழைவுத் தேர்வுகள் ',
                  content: this.items.entanceExams || this.noData,
                },
                {
                  title: 'பணி வாய்ப்புகள் ',
                  content: this.items.jobs || this.noData,
                },
                {
                  title: 'மேற்படிப்பு ',
                  content: this.items.higherEducation || this.noData,
                },
              ];
              break;
          }
        }
      });
  }

  selected(i: any) {
    this.selectedMenu = i;
  }
}
