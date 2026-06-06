export class Tenant {
  constructor(readonly name: string) {}

  static default(): Tenant {
    return new Tenant('default');
  }
}
