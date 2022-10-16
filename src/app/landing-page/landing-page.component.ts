import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common/common.service';
import { LanguageService } from '@shared/services/common/language.service';
import { HttpClient,HttpErrorResponse } from "@angular/common/http";
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  isLoggedIn: boolean = false;
  title = '';
  examsList: any[] = [];
  section: any;
  searchKeyData:any[]=[];
  myControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<string[]>;


  examsNotifications: any = [];

  testimonyItems: any = [{
    title: "ENTERTAINMENT",
    sentence: "The lovely duck shockingly sliced because some plastic quickly dodged on",
    src: "/assets/images/landing-page/scholar.png",
  }, {
    title: "SPORTS",
    sentence: "The lovely duck shockingly sliced because some plastic quickly dodged on",
    src: "/assets/images/landing-page/mentorchoose.png",
  }, {
    title: "HEADLINE",
    sentence: "The lovely duck shockingly sliced because some plastic quickly dodged on",
    src: "/assets/images/landing-page/sponsor.png",
  }, {
    title: "MOVIE",
    sentence: "The lovely duck shockingly sliced because some plastic quickly dodged on",
    src: "/assets/images/landing-page/scholar.png",
  },
  //  {
  //   title: "EDUCATION",
  //   sentence: "The lovely duck shockingly sliced because some plastic quickly dodged on",
  //   src: "/assets/images/landing-page/sponsor.png",
  // }
]
   searchValue:any
  currentDate: any = '';

  constructor(
    public service: CommonService,
    public lang: LanguageService,
    public route: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.getSearchKey();

    this.latestNotifications();
    this.lang.events$.forEach((event) => {
      const myArray = this.route.url.split('/');
      let word = myArray[1];
      if ('home' == word) {
        this.latestNotifications();
      }
    });
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  public changeSearchValue(data:any):void{
    this.filteredOptions = data
    .pipe(
      startWith(''),
      map((value:string) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  latestNotifications() {
    var data = {
      pageSize: 15,
      pageIndex: 0,
    };
    debugger;
    const url = this.lang.type
      ? 'exams?notificationStatus=அறிவுப்பு வெளியாகிவிட்டது. விண்ணப்பிக்கிலாம்'
      : 'exams?notificationStatus=Announced and Open';
    this.service.getService('/' + url).subscribe((res: any) => {
      debugger;
      this.examsNotifications = res.results;
      //  this.examsNotifications.push({"link":"/../../assest/Uyar_Kalvi_Vazhikkatti_Book_Draft.pdf","startDate":new Date(),"name":"Career Guidance - Class 11&12" })

    });
  }

  getSearchKey() {
    this.httpClient.get<any>("assets/mock-json/search-key.json").subscribe((data)=>{
      this.options = data.results.rows
      console.log({"searchKeyData":this.searchKeyData})
    }


  )
  }

  moveTo(page: any) {
    this.isLoggedIn = this.service.session('get', 'Authorization')
      ? true
      : false;
    if (this.isLoggedIn) {
      this.route.navigate(['/main/' + page]);
    } else {
      this.service.showToastr('You have to login!', 'warning');
    }
  }

  moveToRegistration(path: any) {
    this.route.navigate([path]);
  }
  moveToLoans() {
    this.route.navigate(['/main/loans']);
  }
  moveToOverview(id: any) {
    this.route.navigate(['/main/categories/exams/', id]);
  }

  chooseType(type: any, title: any) {
    this.title = title;
    this.section = type;
    this.route.navigate(['/main/categories', this.section]);
  }

  moveToList(title: any) {
    this.route.navigate(['/main/categories', this.section]);
  }
}
