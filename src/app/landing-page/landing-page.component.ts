import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common/common.service';
import { LanguageService } from '@shared/services/common/language.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  isLoggedIn: boolean = false;
  title = "";
  examsList: any[] = [];
  section: any;

  examsNotifications: any = [
  ]

  constructor(public service: CommonService, public lang: LanguageService, public route: Router) { }

  ngOnInit(): void {
    this.latestNotifications();
    this.lang.events$.forEach(event => {
      const myArray = this.route.url.split("/");
      let word = myArray[1];
      if ('home' == word) {
        this.latestNotifications();
      }
    });
  }

  latestNotifications() {
    var data = {
      pageSize: 15,
      pageIndex: 0
    }
    const url = this.lang.type ? "exams?notificationStatus=Announced and Open" : "exams?notificationStatus=அறிவுப்பு வெளியாகிவிட்டது. விண்ணப்பிக்கிலாம்";
    this.service.getService("/" + url).subscribe((res: any) => {
      this.examsNotifications = res.results;
    });
  }

  moveTo(page: any) {
    this.isLoggedIn = this.service.session("get", "Authorization") ? true : false;
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
    this.route.navigate(["/main/loans"]);
  }
  moveToOverview(id: any) {
    this.route.navigate(['/main/categories/exams/', id]);
  }

  chooseType(type: any, title: any) {
    console.log('arun');
    this.title = title;
    this.section = type;
    this.route.navigate(['/main/categories', this.section]);
  }

  moveToList(title: any) {
    this.route.navigate(['/main/categories', this.section]);
  }


}
