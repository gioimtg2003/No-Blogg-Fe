export const RoutesMap = {
  AUTH: {
    SIGN_IN: '/login',
  },
  CORE_ROUTES_SETTING: {
    GENERAL: '/general',
    USER: '/users',
    OTHER: '/other',
    PERMISSION: '/permission',
  },
};

export const CORE_ROUTES_SETTING_METADATA = Object.entries(
  RoutesMap.CORE_ROUTES_SETTING
).map(([key, value]) => ({
  label: key.charAt(0) + key.slice(1).toLowerCase(),
  value: key,
  href: value,
}));

export const SETTING_ROUTE_KEYS = {
  GENERAL: 'GENERAL',
  USER: 'USER',
  ROLES: 'ROLES',
  PEOPLE: 'PEOPLE',
  OTHER: 'OTHER',
};

export const PEOPLE_TAB_KEYS = {
  MEMBERS: 'MEMBERS',
  INVITATIONS: 'INVITATIONS',
  REQUEST_ACCESS: 'REQUEST_ACCESS',
};
