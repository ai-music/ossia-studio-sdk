export enum HOST {
  // TODO @Team remember to change this to your localhost for testing
  API = 'https://ossia-studio-api.aimusic.services',
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

export interface IEndpoint {
  path: string
}

export interface IAuthEndpoint {
  create<T>(credentials: Partial<T>): Promise<IApiResponse<IAuthResponse>>
}

export interface IHttpClient {
  post<T>(path: string, payload: Partial<T>): Promise<IApiResponse<T>>
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
