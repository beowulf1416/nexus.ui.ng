import { Component } from '@angular/core';

import { AppHeader } from '../../components/app-header/app-header';


@Component({
  selector: 'lib-unauthorized',
  imports: [
    AppHeader,
  ],
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.css',
})
export class Unauthorized {}
