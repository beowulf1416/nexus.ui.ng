import { Uuid } from 'core';

export class Business {

  constructor(
    readonly business_id: Uuid,
    readonly name: string,
    readonly description: string
  ) {}
}
