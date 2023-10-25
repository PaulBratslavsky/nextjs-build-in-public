export interface StrapiLogin {
  identifier: string;
  password: string;
}

export interface StrapiRegister {
  username: string;
  email: string;
  password: string;
}

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiAuthError {
  status: number;
  name: string;
  message: string;
  details: object;
}

export interface StrapiAuthResponse {
  error?: StrapiAuthError | null;
  data?: object | null;
  jwt: string;
  user: StrapiUser;
}

export interface StrapiAuthActionResponse {
  ok: boolean;
  error?: StrapiAuthError | null;
  data?: object | null;
}