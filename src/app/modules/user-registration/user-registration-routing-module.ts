import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'verified',
    loadComponent: () => import('./components/email-verified/email-verified').then(c => c.EmailVerified)
  },
  {
    path: '',
    loadComponent: () => import('./components/sign-up/sign-up').then(c => c.SignUp)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRegistrationRoutingModule { }
