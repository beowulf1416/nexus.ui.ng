export class TenantItem {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly active: boolean,
    readonly created: Date,
  ) {
  }
}
