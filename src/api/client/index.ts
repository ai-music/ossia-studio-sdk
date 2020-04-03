import dotenv from 'dotenv'
dotenv.config()
import { ApiResponse, CLIENT_TYPE, HOST, IApplication, IApplicationCreate, ICredentials } from '../../types'
import { AuthEndpoint, ApplicationEndpoint, BusinessEndpoint, CampaignEndpoint } from './endpoints'
import { HttpClient } from '../../lib/http_client'

export class ApiClient {
  protected jwt: string
  protected credentials: Partial<ICredentials>
  protected client = new HttpClient()
  public auth: AuthEndpoint = new AuthEndpoint(this.client)
  public application: ApplicationEndpoint = new ApplicationEndpoint(this.client)
  public business: BusinessEndpoint = new BusinessEndpoint(this.client)
  public campaign: CampaignEndpoint = new CampaignEndpoint(this.client)

  protected constructor(credentials: Partial<ICredentials>, public readonly host: string, public type: CLIENT_TYPE) {
    this.credentials = credentials
  }

  /**
   * This method allows you to create your first application.
   * Bare in mind that every application needs to be validated before it can be used.
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
    this.client.setJWT(this.jwt)
  }
}
