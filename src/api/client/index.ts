import env from 'dotenv'
import { ApiResponse, CLIENT_TYPE, HOST, IApplication, IApplicationCreate, ICredentials, IJwtDecoded } from '../../types'
import { AuthEndpoint, ApplicationEndpoint, BusinessEndpoint, CampaignEndpoint, UserEndpoint } from './endpoints'
import { HttpClient } from '../../lib/http_client'
import { Socket } from './sockets'
import { BackingTrackEndpoint } from './endpoints/backing_track'
import jwt from 'jsonwebtoken'

env.config()

export class ApiClient {
  public jwt: string
  public jwtDecoded: IJwtDecoded
  public socketClient: Socket
  public auth: AuthEndpoint
  public application: ApplicationEndpoint
  public backingtrack: BackingTrackEndpoint
  public business: BusinessEndpoint
  public campaign: CampaignEndpoint
  public user: UserEndpoint

  protected credentials: Partial<ICredentials>
  protected client: HttpClient

  protected constructor(credentials: Partial<ICredentials>, public readonly host: string, public type: CLIENT_TYPE) {
    this.credentials = credentials
    this.client = new HttpClient()
    this.auth = new AuthEndpoint(this.client)
    this.application = new ApplicationEndpoint(this.client)
    this.backingtrack = new BackingTrackEndpoint(this.client)
    this.business = new BusinessEndpoint(this.client)
    this.campaign = new CampaignEndpoint(this.client)
    this.user = new UserEndpoint(this.client)
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

  /**
   * This method here allows you to initialize your user client
   * @param email
   * @param password
   * @param host
   */
  static getUserClient(email: string, password: string, host = process.env.HOST_API || HOST.API): ApiClient {
    return new ApiClient({ email, password }, host, CLIENT_TYPE.USER)
  }

  /**
   * This method here allows you to initialize your application client
   * @param apiKey
   * @param apiSecret
   * @param host
   */
  static getApplicationClient(apiKey: string, apiSecret: string, host = process.env.HOST_API || HOST.API): ApiClient {
    return new ApiClient({ apiKey, apiSecret }, host, CLIENT_TYPE.APP)
  }

  /**
   * This method will authenticate the client(user or application) and store the JTW token
   */
  public async authenticate(): Promise<void> {
    const { email, password, apiKey, apiSecret } = this.credentials
    let response = { data: { token: this.jwt } }
    if (apiKey && apiSecret) {
      response = await this.auth.create({ apiKey, apiSecret })
    }
    if (email && password) {
      response = await this.auth.create({ email, password })
    }
    this.jwt = response.data.token
    this.jwtDecoded = jwt.decode(this.jwt) as IJwtDecoded
    this.client.setJWT(this.jwt)
  }

  /**
   * Retrieves the websocket client
   */
  public getWebSocket(): Socket {
    if (!this.socketClient) {
      this.socketClient = new Socket(this.jwt, this.jwtDecoded.ownerId)
    }
    return this.socketClient
  }
}
