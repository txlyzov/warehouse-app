// Auth constants

export const AUTH = {
  NO_ERROR: -1,
  ERROR_EMPTY_FIELS: 0,
  ERROR_EMAIL_UNCORRECT: 1,
  ERROR_PASSWORD_NOT_EQUAL: 2,
  ERROR_NO_ACCOUNT: 3,
  ERROR_EXIST_ACCOUNT: 4,
  ERROR_PASSWORD: 5,
  ERROR_REQUEST: 6,
};

export const WAREHOUSE = {
  NO_ERROR: -1,
  ERROR_EMPTY_FIELS: 0,
  ERROR_LIMIT_REACHED: 1,
  ERROR_AUTH: 2,
  ERROR_REQUEST: 3,
};

// Regex constants

export const EMAIL_REGEX = /\S+@\S+\.\S+/;

export const EMAIL_FRONT_REGEX = /^[^@]*/;
