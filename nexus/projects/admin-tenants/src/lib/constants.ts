export const URLS = {
  base_url: 'http://localhost:8080',

  fetch_tenants: '/admin/tenants/fetch',
  fetch_tenant: '/admin/tenants/fetch/id',
  save_tenant: '/admin/tenants/save',
  set_active: '/admin/tenants/set/active',

  fetch_roles: '/admin/tenants/roles/fetch',
  fetch_role: '/admin/tenants/roles/fetch/id',
  save_role: '/admin/tenants/role/save',
  role_set_active: '/admin/tenants/roles/set/active',
  assign_permissions: '/admin/tenants/roles/assign/permissions',

  fetch_permissions: '/permissions/fetch',

  fetch_users: '/admin/tenants/fetch/users'
};
