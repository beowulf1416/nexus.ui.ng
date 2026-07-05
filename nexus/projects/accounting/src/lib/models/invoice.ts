import { InvoiceItem } from './invoice-item';

export class Invoice {
  constructor(
    readonly invoice_id: string,
    readonly invoice_type_id: number,
    readonly due_date: Date | null,
    readonly description: string,
    readonly items: Array<InvoiceItem>,
  ) {}
}
