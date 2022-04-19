import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cmg-soon',
  templateUrl: './cmg-soon.component.html',
  styleUrls: ['./cmg-soon.component.scss']
})
export class CmgSoonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

}
