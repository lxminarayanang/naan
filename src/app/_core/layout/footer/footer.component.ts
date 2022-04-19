import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common/common.service';
import { LanguageService } from '@shared/services/common/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  count: any = 0;
  constructor(
    public service: CommonService,
    public lang: LanguageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getService("/count").subscribe((res: any) => {
      this.count = res.results[0].count;
    })
  }


  moveTo() {
    this.router.navigate([]).then(result => { window.open("https://tnschools.gov.in/?lang=en", '_blank'); });
  }
}
