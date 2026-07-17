import { Component, input, inject, OnInit, signal } from '@angular/core';
import { AccountingService } from '../../../services/accounting-service';
import { Uuid } from 'core';

@Component({
  selector: 'account-node-name',
  imports: [],
  templateUrl: './account-node-name.html',
  styleUrl: './account-node-name.css',
})
export class AccountNodeName implements OnInit {
  model = signal({
    account_id: '',
    name: '',
  });

  private acctg_service = inject(AccountingService);

  account_id = input.required<Uuid>();

  constructor() { }

  ngOnInit(): void {
    console.info('AccountNodeName::ngOnInit');

    this.acctg_service.account_fetch(this.account_id()).subscribe({
      next: (account) => {
        if (account) {
          this.model.update((model) => ({ ...model, account_id: account.account_id.to_string(), name: account.name }));
        }
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
