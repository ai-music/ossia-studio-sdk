import { ApiResponse, ENDPOINT, IAuthEndpoint, IAuthResponse, IIdentity, IHttpClient } from '../../../types'

export class AuthEndpoint implements IAuthEndpoint {
  public path = `${ENDPOINT.AUTH}`
  protected applicationId: string
  protected applicationToken: string

  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method allows you authenticate your account
   * @param payload
   */
  public create(payload: Partial<IIdentity>): ApiResponse<IAuthResponse> {
    return this.client.post<Partial<IIdentity>, IAuthResponse>(this.path, payload)
  }
}
