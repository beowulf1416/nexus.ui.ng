export const BASE_URL = 'http://localhost:8080/api/v1';

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const URLS = {
  // base_url: 'http://localhost:8080',

  authenticate: `${BASE_URL}/session/sign-in`,
  fetch_current_user: `${BASE_URL}/session/user`,
  fetch_tenants: `${BASE_URL}/session/tenants`,
  switch_tenant: `${BASE_URL}/session/tenant/set`,

  fetch_currencies: `${BASE_URL}/currencies`,
  fetch_countries: `${BASE_URL}/countries`,
  fetch_uoms: `${BASE_URL}/uoms`,
  fetch_uoms_by_dimension: `${BASE_URL}/uoms/dimension/`,
  fetch_dimensions: `${BASE_URL}/dimensions`,
};
