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

  constructor(
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    public lang: LanguageService,
    public service: CommonService,
    public _location: Location
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
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
    debugger;
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
    debugger;
    this.title = title;
    this.section = type;
    this.examsList = [];
    var data = {
      pageSize: 9,
      pageIndex: 0,
    };

    this.service.postService(`/${type}`, data).subscribe((res: any) => {
      this.examsList = res.results.rows;
      console.log('examsList', this.examsList);
    });

    this.selectSpecilaztions(this.section);
  }

  replaceHttps(url: any) {
    return url ? url.replace(/^https?:\/\//, '') : url;
  }

  selectSpecilaztions(type: string) {
    var data = {
      pageSize: 20,
      pageIndex: 0,
    };
    if (type == 'scholarships') {
      debugger;
      this.service
        .getService(`/${type}/filter?menu=scholarshipProvider`)
        .subscribe((res: any) => {
          if (res.status == 200) {
            this.specilaztions = res.results;
            console.log(this.specilaztions);
          }
        });
    } else {
      debugger;
      this.service
        .getService(`/${type}/filter?menu=field`)
        .subscribe((res: any) => {
          if (res.status == 200) {
            this.specilaztions = res.results;
            console.log(this.specilaztions);
          }
        });
    }
  }

  selectedCourse(course: any) {
    debugger;
    this.router.navigate([
      '/main/categories/' + this.section + '/' + course + '/list',
    ]);
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
      ? 'exams?notificationStatus=Announced and Open'
      : 'exams?notificationStatus=அறிவுப்பு வெளியாகிவிட்டது. விண்ணப்பிக்கிலாம்';
    this.service.getService('/' + url).subscribe((res: any) => {
      this.examsNotifications = res.results;
    });
  }
}
