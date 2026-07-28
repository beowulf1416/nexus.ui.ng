import { Uuid } from "core";

export interface LocationData {
  readonly location_id: Uuid;
  readonly version: number,
  readonly name: string;
  readonly description: string;

  readonly floor: string;
  readonly level: string;
  readonly section: string;
  readonly row: string;
  readonly rack: string;
  readonly aisle: string;
  readonly shelf: string;
  readonly bin: string;
  readonly pallet: string;
}
