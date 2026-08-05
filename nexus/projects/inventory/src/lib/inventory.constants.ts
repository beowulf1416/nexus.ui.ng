import { BASE_URL } from "core";

export const URLS = {
  warehouses_fetch: `${BASE_URL}/inv/warehouses/fetch`,
  warehouse_save: `${BASE_URL}/inv/warehouses/save`,

  location_save: `${BASE_URL}/inv/locations/save`,
  locations_fetch: `${BASE_URL}/inv/locations/fetch`,

  item_save: `${BASE_URL}/inv/items/save`,
  items_fetch: `${BASE_URL}/inv/items/fetch`,

  purchase_order_save: `${BASE_URL}/inv/transactions/po/save`,
};
