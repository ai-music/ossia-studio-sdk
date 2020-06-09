import {
  ApiResponse,
  IHttpClient,
  IRemixEngineMasterResponse,
  IRemixEngineMasterCreate,
  IRemixEnginePreviewCreate,
  IRemixEnginePreviewResponse,
  ENDPOINT,
} from '../../../types'

export class RemixEngineEndpoint {
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method allows you to create a master
   * @param payload
   */
  public createMaster(payload: IRemixEngineMasterCreate): ApiResponse<IRemixEngineMasterResponse[]> {
    return this.client.post<IRemixEngineMasterCreate, IRemixEngineMasterResponse[]>(ENDPOINT.REMIX_ENGINE_MASTER, payload)
  }

  /**
   * This method allows you to create a remix preview
   * @param payload
   */
  public createPreview(payload: IRemixEnginePreviewCreate): ApiResponse<IRemixEnginePreviewResponse> {
    return this.client.post<IRemixEnginePreviewCreate, IRemixEnginePreviewResponse>(ENDPOINT.REMIX_ENGINE_PREVIEW, payload)
  }
}
