export interface OrganizationNodeData {
  readonly org_id: string;
  readonly parent_org_id: string,
  readonly active: boolean,
  readonly created: Date,
  readonly updated: Date,
  readonly name: string;
  readonly description: string;
  readonly level: number,
  readonly children: OrganizationNodeData[]
}
