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

  get is_authenticated(): boolean {
    return this.name !== '';
  }

  is_authorized(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}
