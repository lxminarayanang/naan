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
      // {
      //   label: 'Academic Details',
      //   route: '/student/academic',
      //   disabled: false,
      // },

      {
        label: 'Higher Education Interest & Aspirations 1 - Specialization',
        route: '/student/specialization',
        disabled: false,
      },
      // {
      //   label: 'Courses',
      //   route: '/student/courses',
      //   disabled: false,
      // },
      {
        label: 'Higher Education Interest & Aspirations 1 - Entrance exam',
        route: '/student/exams',
        disabled: false,
      },
      {
        label: 'Higher Education Interested & Aspirations 2',
        route: '/student/career',
        disabled: false,
      },
      {
        label: 'College Application Documents Checklist',
        route: '/student/certificate',
        disabled: false,
      },
      {
        label: 'Scholarships exams ',
        route: '/student/observer',

        disabled: true,
      },
      {
        label: 'Career Interests & Aspirations',
        route: '/student/career-interest',
        disabled: true,
      },
      // {
      //   label: 'Higher Education & Career Guidance',
      //   route: '/student/career-guidance',
      //   disabled: true,
      // },

    ];
  }
  ngOnInit() {
    this.url = this.router.url;
  }
}
