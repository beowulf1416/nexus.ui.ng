export interface PartnerData {
  readonly partner_id: string;

  readonly active: boolean;
  readonly created: Date;

  readonly business_name: string;
  readonly description: string;

  readonly first_name: string;
  readonly middle_name: string;
  readonly last_name: string;
  readonly prefix: string;
  readonly suffix: string;
}
