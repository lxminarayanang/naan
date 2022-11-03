import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-plans',
  templateUrl: './lesson-plans.component.html',
  styleUrls: ['./lesson-plans.component.scss']
})
export class LessonPlansComponent implements OnInit {
  public userDetails: any = {};

  constructor(private _router: Router) { }

  ngOnInit(): void {

  }

}
