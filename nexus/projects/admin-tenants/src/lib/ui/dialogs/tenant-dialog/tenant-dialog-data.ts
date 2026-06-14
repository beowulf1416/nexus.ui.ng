import { TenantItem } from '../../../models/tenant-item';

export class TenantDialogData {

  constructor(
    readonly tenant_item: TenantItem | null,
  ) {}
}
