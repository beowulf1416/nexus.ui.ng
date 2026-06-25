import { Uuid } from "core";

export class Person {
  constructor(
    readonly id: Uuid,
    readonly first_name: string,
    readonly middle_name: string,
    readonly last_name: string,
    readonly prefix: string,
    readonly suffix: string,
    // date record was created
    readonly created: Date,
    readonly active: boolean
  ){}

  get name(): string {
    return `${this.prefix} ${this.first_name} ${this.middle_name} ${this.last_name} ${this.suffix}`.trim()
  }
}
