import { Uuid } from 'core';

export class Business {

  constructor(
    readonly tenant_id: Uuid,
    readonly business_id: Uuid,
    readonly name: string,
    readonly description: string
  ) {}
}
