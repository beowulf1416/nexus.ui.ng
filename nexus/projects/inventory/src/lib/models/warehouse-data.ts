import { Uuid } from "core";

export interface WarehouseData {
  readonly warehouse_id: Uuid;
  readonly active: boolean;
  readonly version: number;
  readonly name: string;
  readonly description: string;
}
