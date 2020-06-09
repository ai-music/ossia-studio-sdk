export enum HOST {
  API = 'https://ossia-studio-api.aimusic.services',
  SOCKETS = 'https://ossia-studio-sockets.aimusic.services',
}

export enum HTTP_METHOD {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export enum ENDPOINT {
  FAVOURITES = 'favourites',
  DASHBOARD = 'dashboard',
  AUTH = 'auth',
  ACTIVATE = 'activate',
  APPLICATIONS = 'applications',
  BUSINESSES = 'businesses',
  TRACKS = 'tracks',
  USERS = 'users',
  CAMPAIGNS = 'campaigns',
  REMIX_ENGINE_MASTER = 'remix-engine/master',
  REMIX_ENGINE_PREVIEW = 'remix-engine/preview',
  REMIX_ENGINE = 'remix-engine',
  VOCAL_TRACKS = 'vocal-tracks',
  BACKING_TRACKS = 'backing-tracks',
  REMIX_TRACKS = 'remix-tracks',
}

interface IRemixEngineResponse {
  processId: string
  isValid: boolean
}

export interface IRemixEngineMasterCreate {
  campaignId: string
}

export interface IRemixEngineMasterResponse extends IRemixEngineResponse {}

export interface IRemixEnginePreviewCreate {
  backingTrackId: string
  length: number
}

export interface IRemixEnginePreviewResponse extends IRemixEngineResponse {
  tracks: { uri: string }[]
  markers: unknown[]
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
  role?: ROLE
}

export type IIdentity = IAppCredentials &
  IUserCredentials & {
    isAuthenticated: boolean
    token: string
    decodedJwt: IJwtDecoded
    user: IUserPayload
    app: IApplication
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
  create(payload: IIdentity): ApiResponse<IAuthResponse>
}

export interface IHttpClient {
  post<Input, Output>(path: string, payload: Input): ApiResponse<Output>

  get<Output, Input = {}>(path: string, payload?: Input): ApiResponse<Output>

  put<Input>(path: string, payload: Input): ApiResponse<Input>

  patch<Input, Output>(path: string, payload: Input): ApiResponse<Output>
}

export type ApiResponse<T> = Promise<IApiResponse<T>>

export interface IApiResponse<T> {
  data: T
  isValid: boolean
  paginator?: IPaginator
}

export interface IAuthResponse {
  token: string
}

export enum OWNER_TYPE {
  APPLICATION = 'application',
  USER = 'user',
}

export interface IEntity {
  id?: string
  createdAt: Date
}

export interface IOwnerIdentity {
  ownerId: string
  ownerType: OWNER_TYPE
}

export interface IApplication extends IEntity {
  appName: string
  apiKey?: string
  apiSecret?: string
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

export type IImmutableFields = 'ownerId' | 'ownerType' | 'id' | 'createdAt'

export type IImmutableTrackFields = 'storage' | 'uploadPolicy'

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

export enum STATE {
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  UPLOADED = 'UPLOADED',
  DELETED = 'DELETED',
  READY = 'READY',
  VERIFIED = 'VERIFIED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DISABLED = 'DISABLED',
  PROCESSING = 'PROCESSING',
}

export interface ICampaignCreate {
  title: string
}

export interface ICampaign extends IEntity, IOwnerIdentity {
  title: string
  state: STATE.DELETED | STATE.READY
  vocalTracks: string[]
  remixTracks: string[]
  master: {
    storage: string | null
    storageKey: string | null
    state: STATE.PENDING | STATE.READY | STATE.ERROR | STATE.PROCESSING
    error?: string
  }
}

export enum WEBSOCKET_EVENT {
  CONNECT = 'connect',
  CONNECT_ERROR = 'connect_error',
  VOCAL_TRACK_READY = 'VOCAL_TRACK_READY',
  VOCAL_TRACK_ERROR = 'VOCAL_TRACK_ERROR',
  REMIX_TRACK_MASTER_READY = 'REMIX_TRACK_MASTER_READY',
  REMIX_TRACK_MASTER_ERROR = 'REMIX_TRACK_MASTER_ERROR',
  CAMPAIGN_MASTER_READY = 'CAMPAIGN_MASTER_READY',
  CAMPAIGN_MASTER_ERROR = 'CAMPAIGN_MASTER_ERROR',
}

export interface IJwtDecoded {
  role: string
  ownerId: string
  permission: number
  iat: number
  exp: number
  aud: string
  iss: string
  sub: string
}

export interface IVocalTrack extends IEntity, IOwnerIdentity {
  title: string
  length: number
  score: number
  state: STATE.PENDING | STATE.READY | STATE.ERROR | STATE.UPLOADED | STATE.DELETED
  storage?: Partial<IGenericTrackStorage>
  uploadPolicy?: IAwsUploadPolicy
}

export type IImmutableVocalTrackCreateFields = IImmutableFields | IImmutableTrackFields | 'state' | 'score'
export type IVocalTrackCreate = Omit<IVocalTrack, IImmutableVocalTrackCreateFields>

export interface IBackingTrack extends IEntity, IOwnerIdentity {
  title: string
  tempo: number
  templateUId: string
  zeroTime: number[]
  remixSections: IRemixSection[]
  radioSections: IRadioSection[]
  author: string
  instrumentation: INSTRUMENTATION[]
  mood: MOOD[]
  musicStyle: MUSIC_STYLE[]
  percussionId: string
  melodyTimbreId: string
  vocalId: string
  clipId: string
  drumId: string
  fxId: string
  musicalKey: MUSICAL_KEY
  totalLength: number
  state: STATE.PENDING | STATE.READY | STATE.ERROR | STATE.UPLOADED | STATE.DELETED
  storage?: Partial<IGenericTrackStorage>
  uploadPolicy?: IAwsUploadPolicy
}

export type IImmutableBackingTrackCreateFields = IImmutableFields | 'state' | 'uploadPolicy' | 'storage'
export type IBackingTrackCreate = Omit<IBackingTrack, IImmutableBackingTrackCreateFields>

export interface ITrackAudioFiles {
  originalTrackAudio: File | Buffer
}

export type TAudioFile = File | Buffer

export interface IBackingTrackAudioFile extends ITrackAudioFiles {
  previewTrackAudio: File | Buffer
}

export interface IBackingTrackFilters {
  instrumentation?: INSTRUMENTATION[]
  mood?: MOOD[]
  musicStyle?: MUSIC_STYLE[]
  tempo?: [number, number]
  clipId?: string
  ids?: string[]
  state?: STATE
}

export interface IBackingTrackQueryParameters extends IQueryParameters {
  filters?: IBackingTrackFilters
}

export interface IFiltersQueryParameters extends IQueryParameters {
  filters?: {
    ids: string[]
  }
}

export enum MUSIC_STYLE {
  AMBIENT = 'AMBIENT',
  BLUES = 'BLUES',
  FESTIVE = 'FESTIVE',
  COUNTRY = 'COUNTRY',
  FOLK = 'FOLK',
  ACOUSTIC = 'ACOUSTIC',
  FUNK_SOUL = 'FUNK___SOUL',
  HIP_HOP = 'HIP_HOP',
  RNB = 'RNB',
  INDIE = 'INDIE',
  JAZZ = 'JAZZ',
  LATIN = 'LATIN',
  WORLD_MUSIC = 'WORLD_MUSIC',
  CLASSICAL = 'CLASSICAL',
  POP = 'POP',
  REGGAE = 'REGGAE',
  ROCK = 'ROCK',
  DEEP_HOUSE = 'DEEP_HOUSE',
  DRUM_BASS = 'DRUM___BASS',
  DUBSTEP = 'DUBSTEP',
  GARAGE_GRIME_BASSLINE = 'GARAGE__GRIME__BASSLINE',
  TECHNO = 'TECHNO',
  HOUSE = 'HOUSE',
  TRANCE = 'TRANCE',
  TRAP = 'TRAP',
  PSY_TRANCE = 'PSY_TRANCE',
  ELECTRONICA_DOWNTEMPO = 'ELECTRONICA__DOWNTEMPO',
  INDIE_DANCE_NU_DISCO = 'INDIE_DANCE__NU_DISCO',
  FUTURE_BASS = 'FUTURE_BASS',
  AFRO_BEATS = 'AFRO_BEATS',
  BREAKBEAT = 'BREAKBEAT',
  LO_FI = 'LO_FI',
  ELECTRONIC = 'ELECTRONIC',
}

export enum INSTRUMENTATION {
  BRASS = 'BRASS',
  SYNTHESIZERS = 'SYNTHESIZERS',
  KEYS = 'KEYS',
  ORCHESTRAL = 'ORCHESTRAL',
  PERCUSSIVE = 'PERCUSSIVE',
  STRINGS = 'STRINGS',
  GUITARS = 'GUITARS',
  WOODWIND = 'WOODWIND',
}

export enum MOOD {
  ANGRY = 'ANGRY',
  ANTHEMIC = 'ANTHEMIC',
  AWKWARD = 'AWKWARD',
  BEAUTIFUL = 'BEAUTIFUL',
  BRIGHT_CHEERFUL = 'BRIGHT__CHEERFUL',
  CALM = 'CALM',
  CELEBRATORY = 'CELEBRATORY',
  CHEESEY = 'CHEESEY',
  COLD = 'COLD',
  DARK = 'DARK',
  DRAMATIC = 'DRAMATIC',
  DREAMY = 'DREAMY',
  DRIVING = 'DRIVING',
  ENERGETIC = 'ENERGETIC',
  EXCITEMENT = 'EXCITEMENT',
  FRANTIC = 'FRANTIC',
  COMEDIC = 'COMEDIC',
  CREEPY = 'CREEPY',
  HAPPY = 'HAPPY',
  HEROIC = 'HEROIC',
  FEAR = 'FEAR',
  HYPNOTIC = 'HYPNOTIC',
  CURIOUS = 'CURIOUS',
  INSPIRATIONAL = 'INSPIRATIONAL',
  INTIMATE = 'INTIMATE',
  WHIMSICAL = 'WHIMSICAL',
  MELLOW = 'MELLOW',
  TENSE = 'TENSE',
  GLAMOROUS = 'GLAMOROUS',
  MAGICAL = 'MAGICAL',
  BLAND = 'BLAND',
  NOSTALGIC = 'NOSTALGIC',
  SWEEPING = 'SWEEPING',
  PASTORAL = 'PASTORAL',
  POSITIVE_OPTIMISTIC = 'POSITIVE__OPTIMISTIC',
  POWERFUL = 'POWERFUL',
  QUIRKY = 'QUIRKY',
  FORMAL = 'FORMAL',
  ROMANTIC = 'ROMANTIC',
  SAD = 'SAD',
  SEXY = 'SEXY',
  SPARSE = 'SPARSE',
  THOUGHTFUL = 'THOUGHTFUL',
  WARM = 'WARM',
}

export enum MUSICAL_KEY {
  'C' = 'C',
  'C#' = 'C#',
  'D' = 'D',
  'D#' = 'D#',
  'E' = 'E',
  'F' = 'F',
  'F#' = 'F#',
  'G' = 'G',
  'G#' = 'G#',
  'A' = 'A',
  'A#' = 'A#',
  'B' = 'B',
  'Cm' = 'Cm',
  'C#m' = 'C#m',
  'Dm' = 'Dm',
  'D#m' = 'D#m',
  'Em' = 'Em',
  'Fm' = 'Fm',
  'F#m' = 'F#m',
  'Gm' = 'Gm',
  'G#m' = 'G#m',
  'Am' = 'Am',
  'A#m' = 'A#m',
  'Bm' = 'Bm',
}

export interface IRemixSection {
  name: string
  start: [number, number]
  end: [number, number]
  energy: number
  division: number
  compatibility: string[]
}

export type IRadioSection = IRemixSection

export interface IGenericTrackStorage {
  original_wav: string
  original_mp3: string
  preview_mp3: string
}

export interface IAwsUploadPolicy {
  url: string
  fields: Record<string, string>
}

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
  APPLICATION = 'application',
}

export interface IUser extends IEntity {
  firstName: string
  lastName: string
  email: string
  password: string
  state: STATE.ACTIVE | STATE.PENDING | STATE.SUSPENDED
  role: ROLE.USER | ROLE.ADMIN
  telephoneNumber?: string
  permission: number
  mailingList: boolean
  favourites: string[]
}

export type IImmutableUserCreateFields = IImmutableFields | 'state' | 'role' | 'permission' | 'favourites'

export type IUserCreate = Omit<IUser, IImmutableUserCreateFields>

export type IUserPayload = Omit<IUser, 'password'>

export interface IUserActivate {
  token: string
}

export interface IUserDashboard {
  vocalTracks: {
    pending: number
    ready: number
    error: number
  }
  campaigns: {
    active: number
  }
  recentCampaigns: ICampaign[]
}

interface IGenericDashboard {
  total: number
  pending: number
}

export interface ITracksDashboard extends IGenericDashboard {
  ready: number
  error: number
  deleted: number
}

export interface ICampaignsDashboard extends Omit<IGenericDashboard, 'pending'> {
  active: number
  deleted: number
}

export interface IMastersDashboard extends IGenericDashboard {
  ready: number
  error: number
  processing: number
}

export interface IUsersDashboard extends IGenericDashboard {
  active: number
  suspended: number
  verified: number
}

export interface IBusinessesDashboard extends Omit<IGenericDashboard, 'pending'> {
  businessTypes: number
  individualTypes: number
}

export interface IAdminDashboard {
  applications: IApplicationsDashboard
  businesses: IBusinessesDashboard
  campaigns: ICampaignsDashboard
  masters: IMastersDashboard
  backingTracks: ITracksDashboard
  remixTracks: ITracksDashboard
  vocalTracks: ITracksDashboard
  users: IUsersDashboard
}

export interface IApplicationsDashboard extends Omit<IGenericDashboard, 'pending'> {
  active: number
  disabled: number
}

export interface IUserFavourites {
  favourite: string
}

export interface IGenericTrackStorage {
  original_wav: string
  original_mp3: string
  preview_mp3: string
}

export interface IRemixTrack extends IEntity, IOwnerIdentity {
  title: string
  markers: number[]
  remixEngineIndex: number
  tempo: number
  state: STATE.PENDING | STATE.READY | STATE.ERROR | STATE.UPLOADED | STATE.DELETED
  master: {
    storage: string | null
    storageKey: string | null
    state: STATE.PENDING | STATE.READY | STATE.ERROR
    error?: string
  }
  uploadPolicy?: IAwsUploadPolicy
  storage?: Partial<IGenericTrackStorage>
  vocalTrackId: string
  backingTrackId: string
}

export type IImmutableRemixTrackCreateFields = IImmutableFields | IImmutableTrackFields | 'state' | 'master' | 'tempo'
export type IRemixTrackCreate = Omit<IRemixTrack, IImmutableRemixTrackCreateFields>
