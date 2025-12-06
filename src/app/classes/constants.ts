export const CONSTANTS = {
    api_base_url: 'http://localhost:8080',
    session_auth_key: 'sid',

    auth_user: '/session/user',
    switch_tenant: '/session/tenant/set',

    url_admin_tenant_save: '/tenants/save',
    url_admin_tenants_set_active: '/tenants/set/active',
    url_admin_tenants_search: '/tenants/fetch',
    url_tenant_fetch_by_id: '/tenants/fetch/id',
    url_tenant_users_fetch: '/tenants/fetch/users',
    url_tenant_roles_fetch: '/tenants/roles/fetch',
    url_tenant_role_save: '/tenants/role/save',
    url_tenant_roles_assign_permissions: '/tenants/role/assign/permissions',
    url_tenant_roles_revoke_permissions: '/tenants/role/revoke/permissions',

    url_user_save: '/users/create',
    url_users_search: '/users/fetch',
    url_users_set_active: '/users/set/active',
    url_users_set_active_multiple: '/users/set/active/multiple',
    url_users_assign_tenants: '/users/assign/tenants',

    url_permissions_fetch: '/permissions/fetch'
};