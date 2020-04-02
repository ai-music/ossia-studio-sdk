export enum HOST {
  API = 'https://ossia-studio-api.aimusic.services',
}

export enum HTTP_METHOD {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
}

export enum ENDPOINT {
  AUTH = 'auth',
  APPLICATIONS = 'applications',
  BUSINESS = 'businesses',
  TRACK = 'tracks',
  USER = 'users',
  CAMPAIGN = 'campaigns',
  REMIX_ENGINE = 'remix-engine',
  VOCAL_TRACK = 'vocal-tracks',
  BACKING_TRACK = 'backing-tracks',
  REMIX_TRACK = 'remix-tracks',
}

export enum CLIENT_TYPE {
  APP = 'APP',
  USER = 'USER',
}

export interface IAuthCredentials {
  email: string
  password: string
  apiKey: string
  apiSecret: string
  jwt: string
}

export interface IPaginator {
  from: number
  size: number
  total?: number
}

export interface IQueryParameters {
  paginator?: IPaginator
}

export interface IAuthEndpoint {
  create<T>(payload: Partial<T>): Promise<IApiResponse<IAuthResponse>>
}

export interface IHttpClient {
  post<T>(path: string, payload: Partial<T>): Promise<IApiResponse<T>>
  get<T>(path: string, payload?: any): Promise<IApiResponse<T>>
  put<T>(path: string, payload: Partial<T>): Promise<IApiResponse<T>>
}

export interface IApiResponse<T> {
  data: T
  isValid: boolean
}

export interface IAuthResponse {
  token: string
}

export interface IEntity {
  id?: string
  createdAt: Date
}

export interface IApplication extends IEntity {
  appName: string
  apiKey: string
  apiSecret: string
  state: string
  role: string
  permission: number
}
