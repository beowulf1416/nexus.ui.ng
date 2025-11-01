import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { anonymousGuard } from '../../classes/guards/anonymous-guard';
import { authenticatedGuard } from '../../classes/guards/authenticated-guard';

const routes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    canActivate: [
      anonymousGuard
    ],
    loadComponent: () => import('./components/sign-in/sign-in').then(C => C.SignIn)
  },
  {
    path: 'sign-out',
    title: 'Sign Out',
    canActivate: [
      authenticatedGuard
    ],
    loadComponent: () => import('./components/sign-out/sign-out').then(c => c.SignOut)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
