import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { anonymousGuard } from '../../classes/guards/anonymous-guard';

const routes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    canActivate: [
      anonymousGuard
    ],
    loadComponent: () => import('./components/sign-in/sign-in').then(C => C.SignIn)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
