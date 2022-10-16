import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  questions: any[] = [
    {
      questions: "கட்டுரைகள் மற்றும் உரைநடைகள் எழுதுதல்"
    },
    {
      questions: "ஆவணங்கள் மற்றும் ஆய்வுக் குறிப்புகளுடன் வேலை செய்தல்"
    },
    {
      questions: "எழுத்து வடிவத்தில் தகவல்களை வழங்குதல்"
    },
    {
      questions: "தகவல் தொடர்பு கொள்ள தான் கற்றுக்கொண்ட மொழிகளைப் பயன்படுத்துதல்"
    },
    {
      questions: "மற்றவர்களுக்குக் கற்பித்தல் மற்றும் பயிற்சி அளித்தல்"
    },
    {
      questions: "உரையாடல் மற்றும் விவாதங்களில் ஈடுபடுதல்"
    },
    {
      questions: "எண்ணங்கள் மற்றும் சிந்தனைகளை பிறர் புரிந்து கொள்ளும் வகையில் வழங்குதல்"
    },
    {
      questions: "தகவல்கள் மற்றும் தரவுகளை பயன்படுத்தி அறிக்கைகள் தயாரித்தல்"
    },
    {
      questions: "கொடுக்கப்படும் அறிக்கைகள் மற்றும் தகவல்களை படித்து புரிந்து கொள்ளுதல்"
    },
    {
      questions: "பேச்சு மொழியை கவனமாக உய்த்து உணர்தல்"
    },
    {
      questions: "புதிய சொற்களை கற்றுக்கொள்ள அகராதியைப் பயன்படுத்துதல்"
    },
    {
      questions: "எழுத்து மொழியில் உள்ள  படைப்புகளை உருவாக்குதல், மிகத் துல்லியமாக சரிபார்த்தல் மற்றும் மீளாய்வு செய்தல் "
    },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  moveTo() {
    this.router.navigate(["/main/assessment/", "1234"])
  }
}
