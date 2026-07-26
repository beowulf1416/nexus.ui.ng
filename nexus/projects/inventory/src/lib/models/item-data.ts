import { Uuid } from "core";

export interface ItemData {
  readonly item_id: Uuid;
  readonly name: string;
  readonly description: string;
}
