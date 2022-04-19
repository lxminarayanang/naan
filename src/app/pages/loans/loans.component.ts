import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '@shared/services/common/language.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    public lang: LanguageService
  ) { }

  ngOnInit(): void {
  }
  moveTo() {
    this.location.back();
  }
  redirectTo() {
    window.open(
      "https://www.vidyalakshmi.co.in/Students/signup",
      '_blank'
    );
  }
}
