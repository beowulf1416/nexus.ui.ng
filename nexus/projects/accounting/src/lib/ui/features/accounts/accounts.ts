import { Component, OnInit, signal } from '@angular/core';

class Account {
  constructor(
    readonly account_id: string,
    readonly code: string,
    readonly balance: string,
    readonly accounts: Array<Account>,
  ) {}
}

@Component({
  selector: 'lib-accounts',
  imports: [],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts implements OnInit {
  model = signal({
    accounts: new Array<Account>(),
  });

  constructor() {}

  ngOnInit(): void {}
}
