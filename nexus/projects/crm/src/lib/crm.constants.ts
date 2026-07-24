import { BASE_URL } from "core";

export const URLS = {

  // person_save: '/crm/person/save',
  // business_save: '/crm/business/save',

  partner_save: `${BASE_URL}/crm/partner/save`,
  partners_fetch: `${BASE_URL}/crm/partners/fetch`,
  partner_fetch: `${BASE_URL}/crm/partners/fetch/id`,
  partners_set_active: `${BASE_URL}/crm/partners/set/active`,
};
