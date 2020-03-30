import { ENDPOINT, IApiResponse, IApplication, IHttpClient } from '../../../types'

export class ApplicationEndpoint {
  public path = `${ENDPOINT.APPLICATIONS}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method will log you in with your application credentials
   * @param payload
   */
  public async create(payload: Partial<IApplication>): Promise<IApiResponse<IApplication>> {
    return this.client.post<IApplication>(this.path, payload)
  }
}
