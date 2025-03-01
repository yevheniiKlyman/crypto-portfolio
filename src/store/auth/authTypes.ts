export interface User {
  email: string;
  uid: string;
}

export type AuthError = {
  code: string;
  message: string;
};

export type AuthArgs = {
  email: string;
  password: string;
};
