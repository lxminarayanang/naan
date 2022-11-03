import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CmsInterceptor } from './shared/interceptor/interceptor';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { FileSizePipe } from '@shared/pipe/filesize.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LayoutModule } from '@core/layout/layout.module';
import { ToastrModule } from 'ngx-toastr';
import { StepWizardModule } from './step-form/step-wizard.module';
import { SurveyFormModule } from './survey-form/survey-form.module';
import { StudentDetailModule } from './pages/student/student.module';
import { StudentSurveyFormModule } from './student-survey-details/student-survey-detail.module';
import { LessonPlansComponent } from './lesson-plans/lesson-plans.component';

@NgModule({
  declarations: [AppComponent, LessonPlansComponent],
  imports: [
    BrowserModule,
    StepWizardModule,
    AppRoutingModule,
    HttpClientModule,
    SurveyFormModule,
    StudentDetailModule,
    StudentSurveyFormModule,
    SharedModule,
    LayoutModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    CarouselModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CmsInterceptor, multi: true },
    FileSizePipe,
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
