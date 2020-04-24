import env from 'dotenv'
import { ApiResponse, HOST, IApplication, IApplicationCreate, IIdentity, IJwtDecoded, IUserPayload, ROLE } from '../../types'
import {
  AuthEndpoint,
  ApplicationEndpoint,
  BusinessEndpoint,
  CampaignEndpoint,
  UserEndpoint,
  BackingTrackEndpoint,
  RemixTrackEndpoint,
  VocalTrackEndpoint,
} from './endpoints'
import { HttpClient } from '../../lib/http_client'
import { Socket } from './sockets'
import jwt from 'jsonwebtoken'

env.config()

export class ApiClient {
  public socketClient: Socket
  public auth: AuthEndpoint
  public application: ApplicationEndpoint
  public backingTrack: BackingTrackEndpoint
  public business: BusinessEndpoint
  public campaign: CampaignEndpoint
  public remixTrack: RemixTrackEndpoint
  public user: UserEndpoint
  public vocalTrack: VocalTrackEndpoint
  public identity: Partial<IIdentity>
  protected client: HttpClient
  private static instance: ApiClient

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
    this.user = new UserEndpoint(this.client)
    this.vocalTrack = new VocalTrackEndpoint(this.client)
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
    const { email, password, apiKey, apiSecret, token } = identity
    if (apiKey && apiSecret) {
      identity.token = await this.fetchToken({ apiKey, apiSecret })
    }
    if (email && password) {
      identity.token = await this.fetchToken({ email, password })
    }
    if (!token && !identity.token) {
      throw new Error('Invalid identity provided')
    }
    // Validate token payload
    identity.decodedJwt = jwt.decode(identity.token) as IJwtDecoded
    if (!identity.decodedJwt) {
      throw new TypeError('Provided token is not valid')
    }
    this.client.setIdentity(identity)

    // fetch the right entity
    if (identity.decodedJwt.role === ROLE.USER || identity.decodedJwt.role === ROLE.ADMIN) {
      identity.user = await this.fetchUser()
    }
    if (identity.decodedJwt.role === ROLE.APPLICATION) {
      identity.app = await this.fetchApp()
    }
    identity.isAuthenticated = true
    delete identity.password
    delete identity.apiSecret
    return this
  }

  protected async fetchToken(payload: Partial<IIdentity>): Promise<string> {
    const {
      data: { token },
    } = await this.auth.create({ ...payload })
    return token
  }

  protected async fetchUser(): Promise<IUserPayload> {
    const { data: user } = await this.user.read()
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

  /**
   * This method allows you to create an application.
   * Bear in mind that every application needs to be accepted and activated before it can be used.
   * @param payload
   */
  static createApp(payload: IApplicationCreate): ApiResponse<Partial<IApplication>> {
    const application: ApplicationEndpoint = new ApplicationEndpoint(new HttpClient())
    return application.create(payload)
  }
}
