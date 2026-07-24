import { InvoiceItem } from './invoice-item';
import { InvoiceItemData } from './invoice-item-data';

export class Invoice {
  constructor(
    readonly invoice_id: string,
    readonly invoice_type_id: number,

    readonly version: number,
    readonly created: Date,
    readonly updated: Date,

    readonly account_id: string,
    readonly org_id: string,
    readonly partner_id: string,

    readonly due_date: Date | null,
    readonly description: string,
    readonly items: Array<InvoiceItemData>,
  ) {}
}
