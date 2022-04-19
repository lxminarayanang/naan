import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '@shared/components';
import { CommonService } from '@shared/services/common/common.service';
import { LanguageService } from '@shared/services/common/language.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginModal') loginModal!: ModalComponent;
  loginModalState: string = 'close';
  language: any = localStorage.getItem('language') == 'tamil' ? true : false;
  isLoggedIn: boolean = false;
  public token: any;

  constructor(
    public service: CommonService,
    public lang: LanguageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.service.session('get', 'Authorization')
      ? true
      : false;
  }

  login(ngForm: NgForm) {
    const loginData = ngForm.form.value;
    debugger;
    const payload = {
      username: loginData.username,
      password: loginData.password,
    };
    // const loginData = {
    //   "username": "3301091170200079",
    //   "password": "0079@2003"
    // };

    this.service.postService('/login', payload).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.isLoggedIn = true;
          // // this.token = res.results.token;
          // this.token = Buffer.from(res.results.token, 'base64').toString(
          //   'ASCII'
          // );
          localStorage.setItem('userDetails', JSON.stringify(res.results.data));
          this.service.session('set', 'Authorization', res.results.token);
          this.service.session(
            'set',
            'userDetail',
            JSON.stringify(res.results)
          );
          // this.service.showToastr(res.message, 'success');
          this.loginModal.close();
          //this.router.navigate(['/main/categories']);
          this.router.navigate(['/main/categories/courses']);
        } else {
          this.service.showToastr('Invalid credentials!', 'warning');
        }
      },
      (err: any) => {
        this.service.showToastr('Invalid credentials!', 'warning');
      }
    );
  }

  career() {
    this.router.navigate(['/main/categories']);
  }

  openLoginModal() {
    this.loginModalState = 'open';
    this.loginModal.open();
  }

  closeModal() {
    this.loginModalState = 'close';
    this.loginModal.close();
  }
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('userDetails');
    this.service.logout();
  }
  languageChange() {
    this.lang.changeLang();
    this.lang.newEvent('clicked!');
  }
}
