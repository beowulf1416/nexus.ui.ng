export class InvoiceItem {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly quantity: number,
    readonly dimension_id: number,
    readonly unit_price: number,
    readonly total: number,
    readonly currency_id: number,
  ) {}
}
