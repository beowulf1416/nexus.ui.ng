export interface InvoiceItemData {
  readonly invoice_item_id: string;
  readonly description: string;
  readonly quantity: number;
  readonly unit_price: number;
  readonly currency_id: number;
  readonly total: number;
  readonly version: number;
}
