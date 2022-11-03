import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepWizardComponent } from './step-form/step-wizard.component';
import { LessonPlansComponent } from './lesson-plans/lesson-plans.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'mentor-form',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'scholarship-form',
    loadChildren: () =>
      import('./pages/scholarship-form/scholarship-form.module').then(
        (m) => m.ScholarshipFormModule
      ),
  },
  {
    path: 'sponsor-form',
    loadChildren: () =>
      import('./pages/sponsar-form/sponsar-form.module').then(
        (m) => m.SponsarFormModule
      ),
  },
  {
    path: 'main/survey',
    component: StepWizardComponent,
  },
  {
    path: 'main/lessons',
    component: LessonPlansComponent,
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./survey-form/survey-form.module').then(
        (m) => m.SurveyFormModule
      ),
  },
  {
    path: 'student/survey',
    loadChildren: () =>
      import('./student-survey-form/student-survey-form.module').then(
        (m) => m.SurveyFormModule
      ),
  },
  {
    path: 'student-detail',
    loadChildren: () =>
      import('./pages/student/student.module').then(
        (m) => m.StudentDetailModule
      ),
  },
  {
    path: 'survey',
    loadChildren: () =>
      import('./student-survey-details/student-survey-detail.module').then(
        (m) => m.StudentSurveyFormModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
