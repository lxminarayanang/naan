import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-survey',
  templateUrl: './student-survey-form.component.html',
  styleUrls: ['./student-survey-form.component.scss'],
})
export class StudentSurveyFormComponent implements OnInit {
  public tabs: any[];
  public url: any;

  constructor(public router: Router, public Activatedroute: ActivatedRoute) {
    this.tabs = [
      {
        label: 'Personal Profile',
        route: '/student/survey/profile',
        disabled: false,
      },
      {
        label: 'Academic Details',
        route: '/student/survey/academic',
        disabled: false,
      },
      {
        label: 'Higher Education Interested & Aspirations',
        route: '/student/survey/career',
        disabled: false,
      },
      {
        label: 'Career Interests & Aspirations',
        route: '/student/survey/career-interest',
        disabled: true,
      },
      // {
      //   label: 'Observation',
      //   route: '/student/survey/observer',
      //   disabled: true,
      // },
    ];
  }
  ngOnInit() {
    this.url = this.router.url;
  }
}
