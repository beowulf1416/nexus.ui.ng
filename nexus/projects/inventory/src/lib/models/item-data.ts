import { Uuid } from "core";

export interface ItemData {
  readonly item_id: Uuid;
  readonly active: boolean;
  readonly version: number;
  readonly name: string;
  readonly description: string;

  readonly sku: string;
  readonly upc: string;

  readonly perishable: boolean;
  readonly flammable: boolean;
  readonly hazardous: boolean;
  readonly esd_sensitive: boolean;
}
