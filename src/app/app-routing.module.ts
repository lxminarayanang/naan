import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';

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
    loadChildren: () =>
      import('./step-form/step-wizard.module').then((m) => m.StepWizardModule),
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
