import { Location } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { Examlist } from '@shared/model/examlist';
import { CommonService } from '@shared/services/common/common.service';
import { LanguageService } from '@shared/services/common/language.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.scss'],
})
export class ExamsListComponent implements OnInit {
  //p: number = 1;
  public items: any = [];
  public coursesListData: any = [];
  public fullData: any = [];
  public filteringValues: any = [];
  // --------------------------------------- Exams-----------------------------------
  public examLevel: any = [];
  public fields: any = [];
  public levels: any = [];
  public examsNotificationTypes: any = [];
  // --------------------------------------- Exams End-----------------------------------

  // --------------------------------------- Colleges Start-----------------------------------
  public states: any = [];
  public collegeTypes: any = [];
  public specilizationTypes: any = [];
  // --------------------------------------- Colleges End-----------------------------------

  // --------------------------------------- Scholarships Start-----------------------------------
  public scholarshipsTypes: any = [];
  public scholarshipLevels: any = [];
  public notificationStatus: any = [];
  // --------------------------------------- Scholarships End-----------------------------------

  // --------------------------------------- Courses Start-----------------------------------
  public coursesTypes: any = [];
  public selected: any = [];
  public selectedCheckbox: any = [];

  public coursesLevels: any = [];

  public admissionProcedures: any = [];
  // --------------------------------------- Courses End-----------------------------------

  paginationSize: any = 10;
  paginationIndex: any = 0;
  pageIndex: any = 0;
  public pageSize = 10;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild('pagee', { static: true }) paginator: MatPaginator;

  title: any;
  id: any;
  sideHeadings: any[] = [];
  pageLength: any;
  selectedMenu: any;
  selectedItem: any;
  filterForm: any;
  fillterArray: any[] = [];
  searchForm: any;
  name: any;
  public course: any;
  public coursesLevel: any[] = [];
  public coursesAdmissionProcedure: any[] = [];
  public speclFilteredArray: any[] = [];
  public educationFilteredArray: any[] = [];
  public collegeListData: any[] = [];
  public sectionName: string = '';
  public notificationStatusLevel: any[] = [];
  public langData: string;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    public lang: LanguageService,
    public service: CommonService,
    private _Activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private exams: Examlist
  ) {}

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this._Activatedroute.queryParams.subscribe((params) => {
      this.langData = params['language'];
    });
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.name = this._Activatedroute.snapshot.paramMap.get('name');
    this.sectionName = this.id.charAt(0).toUpperCase() + this.id.slice(1);

    this.paginationCount({ pageSize: 15, pageIndex: 0 });
    // this.sidemenu();

    if (this.id == 'exams') {
      this.getExamsList();
      this.sidemenuLevelExam();
      this.sidemenuExamsNotificationTypes();
      this.sidemenuExamLevel();
      this.sidemenuExamFields();
      this.title = this.lang.language.entranceExam;
    } else if (this.id == 'scholarships') {
      this.sidemenuScholarshipLevel();
      this.sidemenuScholarshipsTypes();
      this.sidemenuNotificationStatus();
      this.title = this.lang.language.scholarships;
    } else if (this.id == 'colleges') {
      this.getCollegeList();
      this.sidemenuCollegeTypes();
      this.sidemenuSpecilizationTypes();
      this.sidemenuStates();
      this.title = this.lang.language.colleges;
    } else if (this.id == 'careers') {
      this.sidemenuCareers();
      this.title = this.lang.language.careers;
    } else if (this.id == 'courses') {
      this.getCoursesList();
      this.sidemenuCoursesTypes();
      this.sidemenuLevel();
      this.sidemenuAdmission();

      this.title = this.lang.language.courses;
    }

    this.searchForm = this.fb.group({
      searchBox: '',
    });

    this.filterForm = this.fb.group({
      examArray: this.fb.array([]),
      collegeArray: this.fb.array([]),
      scholarshipArray: this.fb.array([]),
      courseArray: this.fb.array([]),
    });

    this.filterForm.valueChanges.subscribe((x: any) => {
      // const temp = x.examArray.length > 0 ? 'examArray' : (x.collegeArray.length > 0) ? 'collegeArray' : (x.scholarshipArray.length > 0) ? 'scholarshipArray' : '';
      if (x.examArray.length > 0) {
        const temp = this.examLevel.concat(
          this.levels,
          this.examsNotificationTypes,
          this.fields
        );
        debugger;
        const res1 = temp.filter((page1: any) =>
          x.examArray?.find((page2: any) => {
            return Object.keys(page1).find((key) => page1[key] === page2);
          })
        );

        const obj = Object.assign({}, ...res1);
        const queryString = Object.keys(obj)
          .map((key) => key + '=' + obj[key])
          .join('&');
        this.paginationList(queryString);
      }

      if (x.collegeArray?.length > 0) {
        const temp = this.states.concat(
          this.specilizationTypes,
          this.collegeTypes
        );
        const res1 = temp.filter((page1: any) =>
          x.collegeArray?.find((page2: any) => {
            return Object.keys(page1).find((key) => page1[key] === page2);
          })
        );
        const obj = Object.assign({}, ...res1);
        const queryString = Object.keys(obj)
          .map((key) => key + '=' + obj[key])
          .join('&');
        this.paginationList(queryString);
      }

      if (x.scholarshipArray.length > 0) {
        const temp = this.scholarshipsTypes.concat(
          this.scholarshipLevels,
          this.notificationStatus
        );
        debugger;
        const res1 = temp.filter((page1: any) =>
          x.scholarshipArray?.find((page2: any) => {
            return Object.keys(page1).find((key) => page1[key] === page2);
          })
        );
        const obj = Object.assign({}, ...res1);
        const queryString = Object.keys(obj)
          .map((key) => key + '=' + obj[key])
          .join('&');
        this.paginationList(queryString);
      }

      if (x.courseArray.length > 0) {
        const temp = this.admissionProcedures.concat(
          this.coursesTypes,
          this.coursesLevels
        );
        const res1 = temp.filter((page1: any) =>
          x.courseArray?.find((page2: any) => {
            return Object.keys(page1).find((key) => page1[key] === page2);
          })
        );
        const obj = Object.assign({}, ...res1);
        const queryString = Object.keys(obj)
          .map((key) => key + '=' + obj[key])
          .join('&');
        this.paginationList(queryString);
      }
    });

    this.searchForm.valueChanges.subscribe((x: any) => {
      if (x.searchBox.length > 0) {
        this.paginationList('search=' + x.searchBox);
        this.selectedMenu = null;
      } else {
        this.paginationList();
      }
    });

    this.lang.events$.forEach((event) => {
      const myArray = this.router.url.split('/');

      let word = myArray[2];
      if ('categories' == word) {
        this.ngOnInit();
      }
    });
  }

  public onClickRedirection(sectionName: string): void {
    this.location.back();
    //this.router.navigate(['/main/categories', sectionName]);
  }
  public onClickRedirectionList(name: string): void {
    this.router.navigate(['/main/categories/' + name + '/list']);
  }

  moveTo(i: any) {
    this.router.navigate(['/main/categories/' + this.id + '/list', i]);
  }

  goToUrl(url: any): void {
    window.open(url, '_blank');
  }

  clearFilter() {
    this.filterForm.reset();
    (this.filterForm.controls['collegeArray'] as FormArray).clear();
    (this.filterForm.controls['examArray'] as FormArray).clear();
    (this.filterForm.controls['courseArray'] as FormArray).clear();
  }

  backTo() {
    this.location.back();
  }

  paginationCount(req: any) {
    this.paginationSize = req.pageSize;
    this.paginationIndex = req.pageIndex;

    this.paginationList();
  }

  paginationList(query?: any) {
    var data = {
      pageSize: this.paginationSize || 15,
      pageIndex: this.paginationIndex || 0,
    };
    debugger;
    const url = query ? this.id + '?' + query : this.id;
    if (
      this.id === 'exams' ||
      this.id === 'scholarships' ||
      this.id === 'careers'
    ) {
      data = {
        pageSize: 100,
        pageIndex: 10,
      };
    }

    this.service.postService('/' + url, data).subscribe((res: any) => {
      this.items = res.results.rows;
      if (
        this.id === 'exams' &&
        this.name !== ' ' &&
        this.langData === localStorage.getItem('language')
      ) {
        let fileteredData: any = [];
        this.items.forEach((item: any) => {
          if (item.field === this.name) {
            fileteredData.push(item);
          }
        });
        if (fileteredData) {
          this.items = fileteredData;
        }
      }
      this.pageLength = res.results.count;
    });
  }

  paginationList1(query?: any) {
    var data = {
      pageSize: this.paginationSize || 100,
      pageIndex: this.paginationIndex || 0,
    };
    const url = query ? this.id + '?' + query : this.id;

    //this.selectTotalData(this.id);
  }

  // Exam filter
  sidemenuExamFields() {
    this.service
      .getService(`/${this.id}/filter?menu=field`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.fields = res.results;
          this.selected = res.results;

          let i = 0;
          this.selected.forEach((w: { field: any; ShiftName: any }) => {
            this.exams = new Examlist();
            this.exams.field = w.field;
            this.exams.selected = w.field == this.name ? true : false;
            this.fields[i] = this.exams;
            i++;
          });
        }
      });
  }
  sidemenuExamLevel() {
    this.service
      .getService(`/${this.id}/filter?menu=level`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.examLevel = res.results;
        }
      });
  }
  sidemenuExamsNotificationTypes() {
    this.service
      .getService(`/${this.id}/filter?menu=notificationStatus`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.examsNotificationTypes = res.results;
        }
      });
  }

  sidemenuLevelExam() {
    this.service
      .getService(`/${this.id}/filter?menu=graduate`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.levels = res.results;
        }
      });
  }

  // College filters
  sidemenuCollegeTypes() {
    this.service
      .getService(`/${this.id}/filter?menu=collegeType`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.collegeTypes = res.results;
        }
      });
  }
  sidemenuSpecilizationTypes() {
    this.service
      .getService(`/${this.id}/filter?menu=field`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.specilizationTypes = res.results;
          this.selected = res.results;

          let i = 0;
          this.selected.forEach((w: { field: any; ShiftName: any }) => {
            this.exams = new Examlist();
            this.exams.field = w.field;
            this.exams.selected = w.field == this.name ? true : false;
            this.specilizationTypes[i] = this.exams;
            i++;
          });
        }
      });
  }
  sidemenuStates() {
    this.service
      .getService(`/${this.id}/filter?menu=state`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.states = res.results;
        }
      });
  }

  // Scholarships filters
  sidemenuScholarshipLevel() {
    this.service
      .getService(`/${this.id}/filter?menu=level`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.scholarshipLevels = res.results;
        }
      });
  }

  sidemenuNotificationStatus() {
    this.service
      .getService(`/${this.id}/filter?menu=notificationStatus`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.notificationStatus = res.results;
        }
      });
  }
  sidemenuScholarshipsTypes() {
    this.service
      .getService(`/${this.id}/filter?menu=scholarshipProvider`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.scholarshipsTypes = res.results;
        }
      });
  }

  // Course filters
  sidemenuCoursesTypes() {
    this.service
      .getService(`/${this.id}/filter?menu=field`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.selected = res.results;

          let i = 0;
          this.selected.forEach((w: { field: any; ShiftName: any }) => {
            this.exams = new Examlist();
            this.exams.field = w.field;
            this.exams.selected = w.field == this.name ? true : false;
            this.coursesTypes[i] = this.exams;
            i++;
          });
        }
      });
  }

  sidemenuLevel() {
    this.service
      .getService(`/${this.id}/filter?menu=level`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.coursesLevels = res.results;
        }
      });
  }
  sidemenuAdmission() {
    this.service
      .getService(`/${this.id}/filter?menu=admissionProcedure`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.admissionProcedures = res.results;
        }
      });
  }

  // Careers filter
  sidemenuCareers() {
    this.service
      .getService(`/${this.id}/filter?menu=field`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.sideHeadings = res.results;
        }
      });
  }

  filterCareers(i?: any, query?: any) {
    this.selectedItem = query;
    this.selectedMenu = i;
    const queryParams = 'field=' + query;
    this.paginationList(queryParams);
  }

  filterExams(e: any) {
    const examArray: FormArray = this.filterForm.get('examArray') as FormArray;
    if (e.target.checked) {
      examArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      examArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          examArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  filterScholarships(e: any) {
    const scholarshipArray: FormArray = this.filterForm.get(
      'scholarshipArray'
    ) as FormArray;
    if (e.target.checked) {
      scholarshipArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      scholarshipArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          scholarshipArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  public changeFilterAdmissionProcedure(e: any, fieldType: string): void {
    debugger;
    if (e.target.checked) {
      this.coursesAdmissionProcedure.push(e.target.value);
    } else {
      const index = this.coursesAdmissionProcedure.indexOf(e.target.value);
      this.coursesAdmissionProcedure.splice(index, 1);
    }
    if (this.coursesAdmissionProcedure.length) {
      const newArray = this._filterLevelTwo(fieldType);

      this.items = Array.from(new Set(newArray));
    } else {
      this.items = this.speclFilteredArray;
    }
  }

  filterCourses(e: any, fieldType: string) {
    debugger;

    if (e.target.checked) {
      this.coursesLevel.push(e.target.value);
    } else {
      const index = this.coursesLevel.indexOf(e.target.value);
      this.coursesLevel.splice(index, 1);
    }

    if (this.coursesLevel.length) {
      const newArray: any = [];
      this.coursesLevel.forEach((item: any) => {
        this.speclFilteredArray.forEach((ele: any) => {
          if (ele[fieldType] == item) {
            newArray.push(ele);
          }
        });
      });

      this.items = Array.from(new Set(newArray));
      this.educationFilteredArray = Array.from(new Set(newArray));
    } else {
      this.items = this.speclFilteredArray;
    }
  }

  //this function used to filter the courses based on the specilizations.
  courseFilter(selected: any, data: any, fieldType: any) {
    debugger;
    this.items = [];
    data.selected = selected.target.checked == true ? true : false;
    this.selectedCheckbox = fieldType.filter(
      (sel: { selected: boolean }) => sel.selected == true
    );
    if (this.selectedCheckbox && this.selectedCheckbox.length > 0) {
      this.selectedCheckbox.forEach((elem: any) => {
        this.coursesListData.filter((elem1: any) => {
          if (elem1.field == elem.field) {
            this.items.push(elem1);
          }
        });
      });

      this.speclFilteredArray = this.items;

      if (this.coursesLevel.length) {
        const fileType = this.id === 'colleges' ? 'collegeType' : 'level';
        this.items = this._filterLevelOne(fileType);
      }

      if (this.coursesAdmissionProcedure.length) {
        const newArray: any = [];
        let fieldType = '';
        switch (this.id) {
          case 'colleges':
            fieldType = 'state';
            break;
          case 'courses':
            fieldType = 'admissionProcedure';
            break;
          case 'exams':
            fieldType = 'level';
            break;
          default:
            break;
        }
        this.coursesAdmissionProcedure.forEach((item: any) => {
          this.items.forEach((element: any) => {
            if (element[fieldType] == item) {
              newArray.push(element);
            }
          });
        });

        this.items = newArray;
      }
    } else {
      this.items = this.coursesListData;
      this.speclFilteredArray = this.items;

      if (this.coursesLevel.length) {
        const fieldType = this.id === 'colleges' ? 'collegeType' : 'level';
        this.items = this._filterLevelOne(fieldType);
      }
      if (this.coursesAdmissionProcedure.length) {
        let fieldType = '';
        if (this.id === 'courses') {
          fieldType = 'admissionProcedure';
        } else if (this.id === 'colleges') {
          fieldType = 'state';
        } else if (this.id === 'exams') {
          fieldType = 'level';
        }
        this.items = this._filterLevelTwo(fieldType);
      }
    }
  }

  public orderByData(type: string): void {
    if (type === '1') {
      this.items = _.orderBy(this.items, ['updatedAt'], ['asc']);
    } else if (type === '2') {
      this.items = _.orderBy(this.items, ['name'], ['asc']);
    } else {
      this.items = _.orderBy(this.items, ['name'], ['desc']);
    }
  }
  // filter exam notification data based on selected and unselected spec only for exams
  public filterExamsNotifications(e: any): void {
    if (e.target.checked) {
      this.notificationStatusLevel.push(e.target.value);
    } else {
      const index = this.notificationStatusLevel.indexOf(e.target.value);
      this.notificationStatusLevel.splice(index, 1);
    }
    if (this.notificationStatusLevel.length) {
      let newArray: any = [];
      this.notificationStatusLevel.forEach((element: any) => {
        if (this.coursesAdmissionProcedure.length && this.coursesLevel.length) {
          let firstFilteredData: any = [];
          if (this.notificationStatusLevel.length === 1) {
            firstFilteredData = this.items;
          }
          this.notificationStatusLevel.length >= 1
            ? firstFilteredData
            : this.items.forEach((item: any) => {
                if (item.notificationStatus === element) {
                  newArray.push(item);
                }
              });
        } else {
          this.coursesListData.forEach((item: any) => {
            if (item.notificationStatus === element) {
              newArray.push(item);
            }
          });
        }
        this.items = Array.from(new Set(newArray));
        console.log(this.items.length);
      });
    } else {
      if (this.coursesAdmissionProcedure.length && this.coursesLevel.length) {
        this.items = this.speclFilteredArray;
      } else {
        this.items = this.coursesListData;
      }
    }
  }

  // End

  public getCoursesList(): void {
    this.service.getService(`/courses`).subscribe((res: any) => {
      if (res.status == 200) {
        this.coursesListData = this.items = res.results;
        this.speclFilteredArray = this.items;
        if (
          this.coursesListData &&
          this.langData === localStorage.getItem('language')
        ) {
          this.getDefaultFilterData();
        }
      }
    });
  }
  public getCollegeList(): void {
    this.service.getService(`/colleges`).subscribe((res: any) => {
      if (res.status == 200) {
        this.coursesListData = this.items = res.results;
        this.speclFilteredArray = this.items;
        if (
          this.coursesListData &&
          this.langData === localStorage.getItem('language')
        ) {
          this.getDefaultFilterData();
        }
      }
    });
  }

  public getDefaultFilterData(): void {
    if (this.name && this.name !== ' ') {
      this.items = [];

      this.coursesListData.filter((elem1: any) => {
        if (elem1.field == this.name) {
          this.items.push(elem1);
        }
      });
    }
    this.speclFilteredArray = this.items;
  }

  private _filterLevelOne(fieldType: string): any {
    const newArray: any = [];
    this.coursesLevel.forEach((item: any) => {
      this.items.forEach((element: any) => {
        if (element[fieldType] == item) {
          newArray.push(element);
        }
      });
    });
    return newArray;
  }

  private _filterLevelTwo(fieldType: string): any {
    const newArray: any = [];
    this.coursesAdmissionProcedure.forEach((item: any) => {
      if (this.coursesLevel.length) {
        this.educationFilteredArray.forEach((ele: any) => {
          if (ele[fieldType] == item) {
            newArray.push(ele);
          }
        });
      } else {
        this.speclFilteredArray.forEach((ele: any) => {
          if (ele[fieldType] == item) {
            newArray.push(ele);
          }
        });
      }
    });
    return newArray;
  }
  public getExamsList(): void {
    this.service.getService(`/exams`).subscribe((res: any) => {
      if (res.status == 200) {
        this.coursesListData = this.items = res.results;
        if (
          this.coursesListData &&
          this.langData === localStorage.getItem('language')
        ) {
          this.getDefaultFilterData();
        }
      }
    });
  }
}
