import { Component } from '@angular/core';
import { Header } from 'core';
import { RouterOutlet } from '@angular/router';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';

@Component({
  selector: 'lib-home',
  imports: [
    RouterOutlet,
    Header,
    SidebarLeft,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
