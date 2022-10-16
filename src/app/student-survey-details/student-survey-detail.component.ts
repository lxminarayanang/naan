import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-survey',
  templateUrl: './student-survey-detail.component.html',
  styleUrls: ['./student-survey-detail.component.scss'],
})
export class StudentSurveyDetailComponent implements OnInit {
  public tabs: any[];
  public url: any;

  constructor(public router: Router, public Activatedroute: ActivatedRoute) {
    this.tabs = [
      {
        label: 'School Details',
        route: '/survey/alumni2022',
        disabled: false,
      },
      {
        label: 'Students Profile',
        route: '/survey/profile',
        disabled: false,
      },
      {
        label: 'Solution Provided		',
        route: '/survey/solution-provided',
        disabled: false,
      },
    ];
  }
  ngOnInit() {
    this.url = this.router.url;
  }
}
