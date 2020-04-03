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

export interface IAppCredentials {
  apiKey: string
  apiSecret: string
}

export interface IUserCredentials {
  email: string
  password: string
}

export type ICredentials = IAppCredentials & IUserCredentials

export interface IPaginator {
  from: number
  size: number
  total?: number
}

export interface IQueryParameters {
  paginator?: IPaginator
}

export interface IAuthEndpoint {
  create(payload: ICredentials): ApiResponse<IAuthResponse>
}

export interface IHttpClient {
  post<Input, Output>(path: string, payload: Input): ApiResponse<Output>
  get<Output, Input = {}>(path: string, payload?: Input): ApiResponse<Output>
  put<Input>(path: string, payload: Input): ApiResponse<Input>
}

export type ApiResponse<T> = Promise<IApiResponse<T>>

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

export interface IApplicationCreate {
  appName: string
}

export interface IBusiness extends IEntity {
  type: BUSINESS_TYPE
  companyName: string
  address: IBusinessAddress
  currency: CURRENCIES
  ownerId: string
}

export type IImmutableFields = 'ownerId' | 'id' | 'createdAt'

export type IBusinessCreate = Omit<IBusiness, IImmutableFields>

export enum BUSINESS_TYPE {
  BUSINESS = 'business',
  INDIVIDUAL = 'individual',
}

export interface IBusinessAddress {
  line1: string
  line2?: string
  city: string
  state?: string
  country: COUNTRY_CODES
  postalCode: string
}

export enum COUNTRY_CODES {
  AF = 'AF',
  AL = 'AL',
  DZ = 'DZ',
  AS = 'AS',
  AD = 'AD',
  AO = 'AO',
  AI = 'AI',
  AG = 'AG',
  AR = 'AR',
  AM = 'AM',
  AW = 'AW',
  AU = 'AU',
  AT = 'AT',
  AZ = 'AZ',
  BS = 'BS',
  BH = 'BH',
  BD = 'BD',
  BB = 'BB',
  BY = 'BY',
  BE = 'BE',
  BZ = 'BZ',
  BJ = 'BJ',
  BM = 'BM',
  BT = 'BT',
  BO = 'BO',
  BQ = 'BQ',
  BA = 'BA',
  BW = 'BW',
  BR = 'BR',
  IO = 'IO',
  BN = 'BN',
  BG = 'BG',
  BF = 'BF',
  BI = 'BI',
  KH = 'KH',
  CM = 'CM',
  CA = 'CA',
  CV = 'CV',
  KY = 'KY',
  CF = 'CF',
  TD = 'TD',
  CL = 'CL',
  CN = 'CN',
  CX = 'CX',
  CC = 'CC',
  CO = 'CO',
  KM = 'KM',
  CG = 'CG',
  CD = 'CD',
  CK = 'CK',
  CR = 'CR',
  CI = 'CI',
  HR = 'HR',
  CU = 'CU',
  CW = 'CW',
  CY = 'CY',
  CZ = 'CZ',
  DK = 'DK',
  DJ = 'DJ',
  DM = 'DM',
  DO = 'DO',
  EC = 'EC',
  EG = 'EG',
  SV = 'SV',
  GQ = 'GQ',
  ER = 'ER',
  EE = 'EE',
  ET = 'ET',
  FK = 'FK',
  FO = 'FO',
  FJ = 'FJ',
  FI = 'FI',
  FR = 'FR',
  GF = 'GF',
  PF = 'PF',
  TF = 'TF',
  GA = 'GA',
  GM = 'GM',
  GE = 'GE',
  DE = 'DE',
  GH = 'GH',
  GI = 'GI',
  EL = 'EL',
  GL = 'GL',
  GD = 'GD',
  GP = 'GP',
  GU = 'GU',
  GT = 'GT',
  GG = 'GG',
  GN = 'GN',
  GW = 'GW',
  GY = 'GY',
  HT = 'HT',
  HM = 'HM',
  VA = 'VA',
  HN = 'HN',
  HK = 'HK',
  HU = 'HU',
  IS = 'IS',
  IN = 'IN',
  ID = 'ID',
  IR = 'IR',
  IQ = 'IQ',
  IE = 'IE',
  IM = 'IM',
  IL = 'IL',
  IT = 'IT',
  JM = 'JM',
  JP = 'JP',
  JE = 'JE',
  JO = 'JO',
  KZ = 'KZ',
  KE = 'KE',
  KI = 'KI',
  KP = 'KP',
  KR = 'KR',
  KW = 'KW',
  KG = 'KG',
  LA = 'LA',
  LV = 'LV',
  LB = 'LB',
  LS = 'LS',
  LR = 'LR',
  LY = 'LY',
  LI = 'LI',
  LT = 'LT',
  LU = 'LU',
  MO = 'MO',
  MK = 'MK',
  MG = 'MG',
  MW = 'MW',
  MY = 'MY',
  MV = 'MV',
  ML = 'ML',
  MT = 'MT',
  MH = 'MH',
  MQ = 'MQ',
  MR = 'MR',
  MU = 'MU',
  YT = 'YT',
  MX = 'MX',
  FM = 'FM',
  MD = 'MD',
  MC = 'MC',
  MN = 'MN',
  ME = 'ME',
  MS = 'MS',
  MA = 'MA',
  MZ = 'MZ',
  MM = 'MM',
  NA = 'NA',
  NR = 'NR',
  NP = 'NP',
  NL = 'NL',
  NC = 'NC',
  NZ = 'NZ',
  NI = 'NI',
  NE = 'NE',
  NG = 'NG',
  NU = 'NU',
  NF = 'NF',
  MP = 'MP',
  NO = 'NO',
  OM = 'OM',
  PK = 'PK',
  PW = 'PW',
  PS = 'PS',
  PA = 'PA',
  PG = 'PG',
  PY = 'PY',
  PE = 'PE',
  PH = 'PH',
  PN = 'PN',
  PL = 'PL',
  PT = 'PT',
  PR = 'PR',
  QA = 'QA',
  RE = 'RE',
  RO = 'RO',
  RU = 'RU',
  RW = 'RW',
  BL = 'BL',
  SH = 'SH',
  KN = 'KN',
  LC = 'LC',
  MF = 'MF',
  PM = 'PM',
  VC = 'VC',
  WS = 'WS',
  SM = 'SM',
  ST = 'ST',
  SA = 'SA',
  SN = 'SN',
  RS = 'RS',
  SC = 'SC',
  SL = 'SL',
  SG = 'SG',
  SX = 'SX',
  SK = 'SK',
  SI = 'SI',
  SB = 'SB',
  SO = 'SO',
  ZA = 'ZA',
  GS = 'GS',
  SS = 'SS',
  ES = 'ES',
  LK = 'LK',
  SD = 'SD',
  SR = 'SR',
  SJ = 'SJ',
  SZ = 'SZ',
  SE = 'SE',
  CH = 'CH',
  SY = 'SY',
  TW = 'TW',
  TJ = 'TJ',
  TZ = 'TZ',
  TH = 'TH',
  TL = 'TL',
  TG = 'TG',
  TK = 'TK',
  TO = 'TO',
  TT = 'TT',
  TN = 'TN',
  TR = 'TR',
  TM = 'TM',
  TC = 'TC',
  TV = 'TV',
  UG = 'UG',
  UA = 'UA',
  AE = 'AE',
  UK = 'UK',
  US = 'US',
  UM = 'UM',
  UY = 'UY',
  UZ = 'UZ',
  VU = 'VU',
  VE = 'VE',
  VN = 'VN',
  VG = 'VG',
  VI = 'VI',
  WF = 'WF',
  EH = 'EH',
  YE = 'YE',
  ZM = 'ZM',
  ZW = 'ZW',
}

export enum CURRENCIES {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}
