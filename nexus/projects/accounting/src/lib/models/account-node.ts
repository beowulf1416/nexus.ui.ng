import { Uuid } from "core";

export interface AccountNode {
  readonly account_id: Uuid;
  readonly active: boolean;
  readonly name: string;
  readonly code: string;
  readonly description: string;
  readonly account_type_id: number;
  readonly account_category_id: number;
  readonly balance: number;
  readonly level: number;
  readonly children: Array<AccountNode>;
}
