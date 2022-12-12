import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormControl } from '@angular/forms';
import { LanguageService } from '../../shared/services/common/language.service';
import { MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { CommonService } from '../../shared/services/common/common.service';
import { ExcelService } from './exel-service';
import { DatePipe } from '@angular/common';



declare var $: any;

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol','action'];
  date = new FormControl();
  public surveyList:any=[];
  public dataSource:any=[];
  fileName: string = 'surveylist.xlsx';
  exportActive:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */


  constructor(
    public lang: LanguageService,
    private _commonService: CommonService,
    private excelService:ExcelService,
    public datepipe: DatePipe
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this._getSurveyList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  private _getSurveyList(): void {
    this._commonService
      .getService(`/one-to-one-assesement/list`)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.surveyList = res.results.surveyList;
          this.dataSource = new MatTableDataSource<any>(this.surveyList);
        }
      });
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.surveyList, 'surveyList');
  }
  onClickXlxxKey(element:any):void{
    const xlxData=[];
    xlxData.push(element)
    this.excelService.exportAsExcelFile(xlxData, element.fullName);
  }
  onClickDateSearch(date:any):void{

    let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
      this._commonService
        .getService(`/one-to-one-assesement/list?date=${latest_date}`)
        .subscribe((res: any) => {
          if (res.status == 200) {
            this.surveyList = res.results.surveyList;
            this.dataSource = new MatTableDataSource<any>(this.surveyList);
          }
        });

  }

}
