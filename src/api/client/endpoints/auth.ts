import { ApiResponse, ENDPOINT, IAuthEndpoint, IAuthResponse, ICredentials, IHttpClient } from '../../../types'

export class AuthEndpoint implements IAuthEndpoint {
  public path = `${ENDPOINT.AUTH}`
  protected applicationId: string
  protected applicationToken: string
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method allows you authenticate your account
   * @param payload
   */
  public create(payload: Partial<ICredentials>): ApiResponse<IAuthResponse> {
    return this.client.post<Partial<ICredentials>, IAuthResponse>(this.path, payload)
  }
}
