import { Uuid } from "core";

export interface LocationData {
  readonly item_id: Uuid;
  readonly name: string;
  readonly description: string;
}
