export interface User {
  id?: string;
  account?: string;
}

export interface GoogleAuthPayload {
  credential: string;
}

export interface LoginPayload {
  account: string;
  password: string;
}
