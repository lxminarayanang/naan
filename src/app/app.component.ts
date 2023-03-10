import { Component, OnInit } from '@angular/core';
import { CommonService } from '@shared/services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fe-tn_schools';

  constructor(private service: CommonService) {
    //this.service.postService('/addCount').subscribe((res: any) => {});
  }

  ngOnInit() {
    localStorage.removeItem('profileFormValue');
    localStorage.removeItem('academicFormValue');
    localStorage.removeItem('careerFormValue');
    localStorage.removeItem('careerInterestFormValue');
  }

  showSelectedText() {
    if (document.getSelection && this.service.screenReaderMode == 'on') {
      var range = document.getSelection();

      const text = range?.toString() || '';

      this.service.playAudio(text);
    }
  }
}
