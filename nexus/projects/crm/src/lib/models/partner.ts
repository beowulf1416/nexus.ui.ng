import { Uuid } from "core";

export class Partner {
  constructor(
    readonly partner_id: Uuid,

    readonly active: boolean,
    readonly created: Date,

    readonly business_name: string,
    readonly description: string,

    readonly first_name: string,
    readonly middle_name: string,
    readonly last_name: string,
    readonly prefix: string,
    readonly suffix: string,
  ) {}
}
