export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const URLS = {
  base_url: 'http://localhost:8080',

  authenticate: '/session/sign-in',
  fetch_current_user: '/session/user',
  fetch_tenants: '/session/tenants',
  switch_tenant: '/session/tenant/set'
};
