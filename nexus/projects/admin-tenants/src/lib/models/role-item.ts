export class RoleItem {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly active: boolean,
    readonly created: Date
  ) {}

  static default(): RoleItem {
    return new RoleItem(
      '',
      '',
      '',
      false,
      new Date());
  }
}
