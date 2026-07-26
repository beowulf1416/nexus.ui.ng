export class InvoiceItem {
  constructor(
    readonly invoice_item_id: string,
    readonly description: string,
    readonly quantity: number,
    // readonly dimension_id: number,
    readonly unit_price: number,
    // readonly total: number,
    readonly currency_id: number,
    readonly version: number
  ) {}

  public get total(): number {
    return this.unit_price * this.quantity;
  }
}
