import { ENDPOINT, ApiResponse, IHttpClient, IMasterResponse, IMasterCreate } from '../../../types'

export class RemixEngineEndpoint {
  public path = `${ENDPOINT.REMIX_ENGINE_MASTER}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method allows you to create a master
   * @param payload
   */
  public createMaster(payload: IMasterCreate): ApiResponse<IMasterResponse[]> {
    return this.client.post<IMasterCreate, IMasterResponse[]>(this.path, payload)
  }
}
