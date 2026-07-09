import { Component, OnInit, signal } from '@angular/core';
import { AccountItem } from '../../../models/account-item';
import { AccountNode } from '../../components/account-node/account-node';

// class Account {
//   constructor(
//     readonly account_id: string,
//     readonly code: string,
//     readonly balance: string,
//     readonly accounts: Array<Account>,
//   ) {}
// }

@Component({
  selector: 'lib-accounts',
  imports: [AccountNode],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts implements OnInit {
  model = signal({
    accounts: new Array<AccountItem>(),
  });

  constructor() {}

  ngOnInit(): void {}
}
