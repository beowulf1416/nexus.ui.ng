import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-info-email',
  imports: [
    Header,
    RouterLink
  ],
  templateUrl: './info-email.html',
  styleUrl: './info-email.css',
})
export class InfoEmail {}
