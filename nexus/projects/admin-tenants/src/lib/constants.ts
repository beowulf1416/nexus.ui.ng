import { BASE_URL } from 'core';

export const URLS = {
  // base_url: 'http://localhost:8080',

  fetch_tenants: `${BASE_URL}/admin/tenants/fetch`,
  fetch_tenant: `${BASE_URL}/admin/tenants/fetch/id`,
  save_tenant: `${BASE_URL}/admin/tenants/save`,
  set_active: `${BASE_URL}/admin/tenants/set/active`,

  fetch_roles: `${BASE_URL}/admin/tenants/roles/fetch`,
  fetch_role: `${BASE_URL}/admin/tenants/roles/fetch/id`,
  save_role: `${BASE_URL}/admin/tenants/role/save`,
  role_set_active: `${BASE_URL}/admin/tenants/roles/set/active`,
  assign_permissions: `${BASE_URL}/admin/tenants/roles/assign/permissions`,

  fetch_permissions: `${BASE_URL}/permissions/fetch`,

  fetch_users: `${BASE_URL}/admin/tenants/fetch/users`
};
