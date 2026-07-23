import { InvoiceItemData } from "./invoice-item-data";

export interface InvoiceData {
  readonly invoice_id: string,
  readonly invoice_type_id: number,

  readonly version: number,
  readonly created: Date,
  readonly updated: Date,

  readonly due_date: Date | null,
  readonly description: string,
  readonly items: Array<InvoiceItemData>,
}
