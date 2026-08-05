import { PurchaseOrderItemData } from './purchase-order-item-data';

export interface PurchaseOrderData {
  readonly po_id: string;
  readonly po_date: Date;
  readonly version: number;
  readonly description: string;
  readonly org_id: string;
  readonly partner_id: string;
  readonly items: PurchaseOrderItemData[];
}
