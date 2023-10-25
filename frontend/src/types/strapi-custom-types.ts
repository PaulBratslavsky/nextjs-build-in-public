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
  data?: StrapiAuthResponse | null;
}

export interface StrapiEventDataCollection {
  data: StrapiEventData[];
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiEventData {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    location: string;
    date: string;
    time: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: Image;
  };
}

export interface Image {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: null;
    };
  };
}
