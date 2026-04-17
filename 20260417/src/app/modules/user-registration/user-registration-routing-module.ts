import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'success',
    title: 'Success',
    loadComponent: () => import('./components/sign-up-success/sign-up-success').then(c => c.SignUpSuccess)
  },
  {
    path: 'verified/:token',
    title: 'Sign Up',
    loadComponent: () => import('./components/email-verified/email-verified').then(c => c.EmailVerified)
  },
  {
    path: '',
    title: 'Sign Up',
    loadComponent: () => import('./components/sign-up/sign-up').then(c => c.SignUp)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRegistrationRoutingModule { }
