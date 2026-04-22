import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-sign-up-step-2',
  imports: [
    Header,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './sign-up-step-2.html',
  styleUrl: './sign-up-step-2.css',
})
export class SignUpStep2 {}
