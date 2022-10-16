import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@shared/services/common/common.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;  
  id: any;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  public url: string;
  public userDetails:any;
  public student_name:any;
  isLoggedIn: boolean = false;
  constructor(private _router: Router,public service: CommonService, public Activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.url = this._router.url;
    this.userDetails = JSON.parse(
      localStorage.getItem('userDetails') as string
    );

    if (this.userDetails) {
      this.student_name = this.userDetails.student_name;
    }

    this.isLoggedIn = this.service.session('get', 'Authorization')
      ? true
      : false;

      // this.id = this.Activatedroute.snapshot.paramMap.get('id');
      // console.log(this.id)
      // console.log(this.Activatedroute.snapshot.paramMap.get('id'))

  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('userDetails');
    this.service.logout();
  }

  moveToCareer() {
    this._router.navigate([
      '/main/categories/courses/' + ' ' + '/list',
    ]);
  }
  moveToColleges(){
    this._router.navigate([
      '/main/categories/colleges/' + ' ' + '/list',
    ]);
  }

  public onClickNav(): void {
    this._router.navigate(['/student-detail/profile']);
  }
}
