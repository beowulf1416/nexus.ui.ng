export interface TenantData {
  readonly id: string,
  readonly active: boolean,
  readonly version: number,
  readonly created: Date,
  readonly updated: Date,
  readonly name: string,
  readonly description: string
}
