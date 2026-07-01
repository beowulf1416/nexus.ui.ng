import { Uuid } from "core";

export class Partner {
  constructor(
    public partner_id: Uuid,
    public name: string,
    public created: Date,
    public active: boolean,
  ) {}
}
