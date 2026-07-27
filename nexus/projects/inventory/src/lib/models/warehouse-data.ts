import { Uuid } from "core";

export interface WarehouseData {
  readonly warehouse_id: Uuid;
  readonly active: boolean;
  readonly version: number;
  readonly name: string;
  readonly description: string;
  readonly address: {
    readonly street: string;
    readonly city: string;
    readonly state: string;
    readonly zip: string;
    readonly country_id: string;
  }
}
