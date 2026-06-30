import { Uuid } from './uuid';

export class Tenant {
  constructor(
    readonly id: Uuid,
    readonly name: string
  ) {}

  static default(): Tenant {
    return new Tenant(
      Uuid.default(),
      'default'
    );
  }
}
