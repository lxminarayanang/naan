import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'],
})
export class SurveyFormComponent implements OnInit {
  public tabs: any[];
  public url: any;

  constructor(public router: Router, public Activatedroute: ActivatedRoute) {
    this.tabs = [
      {
        label: 'Personal Profile',
        route: '/student/profile',
        disabled: false,
      },
      {
        label: 'Academic Details',
        route: '/student/academic',
        disabled: false,
      },
      {
        label: 'Higher Education Interested & Aspirations',
        route: '/student/career',
        disabled: false,
      },
      {
        label: 'Career Interests & Aspirations',
        route: '/student/career-interest',
        disabled: true,
      },
      {
        label: 'Observation',
        route: '/student/observer',
        disabled: true,
      },
    ];
  }
  ngOnInit() {
    this.url = this.router.url;
  }
}
