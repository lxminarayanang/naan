import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  public userDetails: any;
  public emsId: string;
  public fullName: string;
  public gender: string;
  public schoolName: string;

  constructor() {}

  ngOnInit(): void {
    this.userDetails = JSON.parse(
      localStorage.getItem('userDetails') as string
    );

    if (this.userDetails) {
      this.fullName = this.userDetails.student_name;
      this.emsId = this.userDetails.student_id;
      this.gender = this.userDetails.gender === 1 ? 'Male' : 'Female';
      this.schoolName = this.userDetails.school_name;
    }
  }
}
