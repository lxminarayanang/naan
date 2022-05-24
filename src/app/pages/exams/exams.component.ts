import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@shared/services/common/common.service';
import { LanguageService } from '@shared/services/common/language.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit {
  title = '';
  examsList: any[] = [];
  section: any;
  loadMore: boolean = false;

  specilaztions: any[] = [];
  examsNotifications: any = [];
  public user: any;
  public langData: any;

  constructor(
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    public lang: LanguageService,
    public service: CommonService,
    public _location: Location
  ) {}

  ngOnInit(): void {
    this.langData = localStorage.getItem('language');
    window.scrollTo(0, 0);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.latestNotifications();
    this.user = JSON.parse(localStorage.getItem('userDetails') as string);
    this.section = this._Activatedroute.snapshot.paramMap.get('id1');
    this.chooseType(this.section, this.lang.language[this.section]);
    this.title = this.lang.language.courses;

    this.lang.events$.forEach((event) => {
      const myArray = this.router.url.split('/');

      let word = myArray[2];
      if ('categories' == word) {
        this.chooseType('courses', this.lang.language.courses);
      }
    });
  }

  moveTo(title: any) {
    this.router.navigate([
      '/main/categories/' + this.section + '/' + ' ' + '/list',
    ]);
  }
  moveToLoans() {
    this.router.navigate(['/main/loans']);
  }
  moveToAssessment() {
    this.router.navigate(['/main/assessment']);
  }
  examOverview(i: any) {
    this.router.navigate(['/main/categories/' + this.section + '/list', i]);
  }

  goToUrl(url: any): void {
    window.open(url, '_blank');
  }
  public goTo(): void {
    this.router.navigate(['main/survey']);
  }

  chooseType(type: any, title: any) {
    this.title = title;
    this.section = type;
    this.examsList = [];
    var data = {
      pageSize: 1000,
      pageIndex: 0,
    };

    this.service.postService(`/${type}`, data).subscribe((res: any) => {
      const uniqueValuesSet = new Set();


      const filteredArr = res.results.rows.filter((obj:any) => {
        // check if name property value is already in the set
        const isPresentInSet = uniqueValuesSet.has(obj.field);
      
        // add name property value to Set
        uniqueValuesSet.add(obj.field);
      
        // return the negated value of
        // isPresentInSet variable
        return !isPresentInSet;
      });
      this.specilaztions = this.examsList = filteredArr;
    });

    // this.selectSpecilaztions(this.section);
  }

  replaceHttps(url: any) {
    return url ? url.replace(/^https?:\/\//, '') : url;
  }

  selectSpecilaztions(type: string) {
    var data = {
      pageSize: 6,
      pageIndex: 0,
    };
    debugger;
    if (type == 'scholarships') {
      this.service
        .getService(`/${type}/filter?menu=scholarshipProvider`)
        .subscribe((res: any) => {
          if (res.status == 200) {
            this.specilaztions = res.results;
          }
        });
    } else {
      this.service
        .getService(`/${type}/filter?menu=field`)
        .subscribe((res: any) => {
          if (res.status == 200) {
            debugger;
            this.specilaztions = res.results;
          }
        });
    }
  }

  selectedCourse(course: any) {
    this.router.navigate(
      ['/main/categories/' + this.section + '/' + course + '/list'],
      { queryParams: { language: this.langData } }
    );
  }

  loadMores(val: boolean) {
    if (val == true) {
      this.loadMore = false;
    } else {
      this.loadMore = true;
    }
  }

  latestNotifications() {
    var data = {
      pageSize: 15,
      pageIndex: 0,
    };
    const url = this.lang.type
      ? 'exams?notificationStatus=அறிவுப்பு வெளியாகிவிட்டது. விண்ணப்பிக்கிலாம்'
      : 'exams?notificationStatus=Announced and Open';
    this.service.getService('/' + url).subscribe((res: any) => {
      this.examsNotifications = res.results;
    });
  }
}
