import { ENDPOINT, IApiResponse, IAuthEndpoint, IAuthResponse, IHttpClient } from '../../../types'

export class AuthEndpoint implements IAuthEndpoint {
  public path = `${ENDPOINT.AUTH}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method allows you authenticate your account
   * @param payload
   */
  public async create<IAuthCredentials>(payload: Partial<IAuthCredentials>): Promise<IApiResponse<IAuthResponse>> {
    // TODO add validation from credentials
    return this.client.post<IAuthResponse>(this.path, payload)
  }
}
