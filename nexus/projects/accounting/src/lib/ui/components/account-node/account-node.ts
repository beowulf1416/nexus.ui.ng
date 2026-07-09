import { Component, input } from '@angular/core';
import { AccountItem } from '../../../models/account-item';

@Component({
  selector: 'account-node',
  imports: [],
  templateUrl: './account-node.html',
  styleUrl: './account-node.css',
})
export class AccountNode {
  account = input.required<AccountItem>();
}
