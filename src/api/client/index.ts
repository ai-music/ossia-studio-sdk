import env from 'dotenv'
import { HOST, IApplication, IIdentity, IJwtDecoded, IUserPayload, ROLE } from '../../types'
import {
  AuthEndpoint,
  ApplicationEndpoint,
  BusinessEndpoint,
  CampaignEndpoint,
  UserEndpoint,
  BackingTrackEndpoint,
  RemixTrackEndpoint,
  VocalTrackEndpoint,
  RemixEngineEndpoint,
} from './endpoints'
import { Socket } from './sockets'
import jwt from 'jsonwebtoken'
import { HttpClient } from './http'

env.config()

export class ApiClient {
  public socketClient: Socket
  public auth: AuthEndpoint
  public application: ApplicationEndpoint
  public backingTrack: BackingTrackEndpoint
  public business: BusinessEndpoint
  public campaign: CampaignEndpoint
  public remixTrack: RemixTrackEndpoint
  public remixEngine: RemixEngineEndpoint
  public user: UserEndpoint
  public vocalTrack: VocalTrackEndpoint
  public identity: Partial<IIdentity>
  protected client: HttpClient
  private static instance: ApiClient
  private refreshTokenTimer: NodeJS.Timeout | null

  protected constructor(identity: Partial<IIdentity>, public readonly host = HOST.API) {
    if (!identity) {
      throw Error('ApiClient: Identity is not set')
    }
    this.identity = identity
    this.client = new HttpClient()
    this.auth = new AuthEndpoint(this.client)
    this.application = new ApplicationEndpoint(this.client)
    this.backingTrack = new BackingTrackEndpoint(this.client)
    this.business = new BusinessEndpoint(this.client)
    this.campaign = new CampaignEndpoint(this.client)
    this.remixTrack = new RemixTrackEndpoint(this.client)
    this.remixEngine = new RemixEngineEndpoint(this.client)
    this.user = new UserEndpoint(this.client)
    this.vocalTrack = new VocalTrackEndpoint(this.client)
    this.refreshTokenTimer = null
  }

  public static async getInstance(identity?: Partial<IIdentity>): Promise<ApiClient> {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(identity)
      return ApiClient.instance.authenticate(identity)
    }
    return ApiClient.instance
  }

  /**
   * This method will authenticate the client(user or application) and store the JTW token
   */
  public async authenticate(identity: Partial<IIdentity>): Promise<ApiClient> {
    const { email, password, apiKey, apiSecret, token, role } = identity
    if (apiKey && apiSecret) {
      identity.token = await this.fetchToken({ apiKey, apiSecret })
    }
    if (email && password) {
      identity.token = await this.fetchToken({ email, password, role })
    }
    if (!token && !identity.token) {
      throw new Error('Invalid identity provided')
    }
    this.client.setToken(identity)

    // Validate token payload
    identity.decodedJwt = jwt.decode(identity.token) as IJwtDecoded
    if (!identity.decodedJwt) {
      throw new TypeError('Provided token is not valid')
    }
    // fetch the right entity
    if (identity.decodedJwt.role === ROLE.USER || identity.decodedJwt.role === ROLE.ADMIN) {
      identity.user = await this.fetchUser(identity.decodedJwt.ownerId)
    }
    if (identity.decodedJwt.role === ROLE.APPLICATION) {
      identity.app = await this.fetchApp()
    }
    identity.isAuthenticated = true
    delete identity.password
    delete identity.apiSecret
    this.identity = identity
    this.refreshTokenInHours(23)
    return this
  }

  protected async refreshToken(token: string): Promise<void> {
    const { data: refreshTokenResponse } = await this.auth.refreshToken({ token })
    this.identity.token = refreshTokenResponse.token
    this.client.setToken(this.identity)
  }

  protected refreshTokenInHours(hours: number): void {
    if (this.refreshTokenTimer) {
      clearTimeout(this.refreshTokenTimer)
      this.refreshTokenTimer = null
    }

    const timeMs = hours * 3_600_000
    this.refreshTokenTimer = setTimeout(() => {
      this.refreshToken(this.identity.token)
        .then(() => this.refreshTokenInHours(hours))
        .catch(error => console.log('Error refreshing token', error))
    }, timeMs)
  }

  protected async fetchToken(payload: Partial<IIdentity>): Promise<string> {
    const {
      data: { token },
    } = await this.auth.create({ ...payload })
    return token
  }

  protected async fetchUser(userId: string): Promise<IUserPayload> {
    const { data: user } = await this.user.read(userId)
    return user
  }

  protected async fetchApp(): Promise<IApplication> {
    const { data: app } = await this.application.read()
    return app
  }

  /**
   * Retrieves the websocket client
   */
  public getWebSocket(): Socket {
    if (!this.socketClient) {
      this.socketClient = new Socket(this.identity.token, this.identity.decodedJwt.ownerId)
      this.socketClient.connect()
      return this.socketClient
    }
    return this.socketClient
  }
}
