export class Tenant {
  
  constructor(
    readonly id: string,
    readonly active: boolean,
    readonly created: Date,
    readonly name: string,
    readonly description: string
  ) {}
}
