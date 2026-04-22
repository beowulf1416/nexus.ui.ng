import { Tenant } from './tenant';

export class User {
  constructor(
    readonly name: string,
    readonly tenant: Tenant,
    readonly permissions: Array<string>,
  ) {}

  static anonymous(): User {
    return new User('', Tenant.default(), new Array<string>());
  }
}
