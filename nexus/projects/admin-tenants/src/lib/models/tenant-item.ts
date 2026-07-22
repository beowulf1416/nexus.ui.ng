

export class TenantItem {
  constructor(
    readonly id: string,
    readonly active: boolean,
    readonly version: number,
    readonly created: Date,
    readonly updated: Date,
    readonly name: string,
    readonly description: string,
  ) {
  }

  static default(): TenantItem {
    return new TenantItem(
      '',
      false,
      0,
      new Date(),
      new Date(),
      '',
      ''
    );
  }
}
