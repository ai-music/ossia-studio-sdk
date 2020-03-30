import { CLIENT_TYPE, HOST, IApiResponse, IApplication, IAuthCredentials } from '../../types'
import { AuthEndpoint } from './endpoints/auth'
import { ApplicationEndpoint } from './endpoints/application'
import { HttpClient } from '../../lib/http_client'

export class ApiClient {
  protected jwt: string
  protected credentials: Partial<IAuthCredentials>
  protected client = new HttpClient()
  public auth: AuthEndpoint = new AuthEndpoint(this.client)

  protected constructor(credentials: Partial<IAuthCredentials>, public readonly host: string, public type: CLIENT_TYPE) {
    this.credentials = credentials
  }

  /**
   * This method allows you to create your first application.
   * Bare in mind that every application needs to be validated before it can be used.
   * @param payload
   */
  static async createApp(payload: Partial<IApplication>): Promise<IApiResponse<Partial<IApplication>>> {
    const application: ApplicationEndpoint = new ApplicationEndpoint(new HttpClient())
    return await application.create(payload)
  }

  /**
   * This method here allows you to initialize your user client
   * @param email
   * @param password
   * @param host
   */
  static getUserClient(email: string, password: string, host = HOST.API): ApiClient {
    return new ApiClient({ email, password }, host, CLIENT_TYPE.USER)
  }

  /**
   * This method here allows you to initialize your application client
   * @param apiKey
   * @param apiSecret
   * @param host
   */
  static getApplicationClient(apiKey: string, apiSecret: string, host = HOST.API): ApiClient {
    return new ApiClient({ apiKey, apiSecret }, host, CLIENT_TYPE.APP)
  }

  /**
   * This method will authenticate the client(user or application) and store the JTW token
   */
  public async authenticate(): Promise<void> {
    const { email, password, apiKey, apiSecret, jwt } = this.credentials
    let response = { data: { token: jwt } }
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
