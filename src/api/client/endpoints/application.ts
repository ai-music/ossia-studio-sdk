import { ENDPOINT, IApplication, IApplicationCreate, IHttpClient, ApiResponse, IFiltersQueryParameters } from '../../../types'
import { stringifyQueryObject } from '../../../utils'

export class ApplicationEndpoint {
  public path = `${ENDPOINT.APPLICATIONS}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method will allow you to create an application
   * @param payload
   */
  public create(payload: IApplicationCreate): ApiResponse<IApplication> {
    return this.client.post<IApplicationCreate, IApplication>(this.path, payload)
  }

  /**
   * This method will return the application model
   * If the applicationId is set, it will return the model if the token has the right permission
   * If the applicationId is not set, it will return the model based on the ownerId
   * @param applicationId
   */
  public read(applicationId?: string): ApiResponse<IApplication> {
    if (applicationId) {
      return this.client.get<IApplication>(`${this.path}/${applicationId}`)
    }
    return this.client.get<IApplication>(this.path)
  }

  /**
   * This method will return the application list
   * Please bear in mind that this method requires specific permission in order to receive the data
   * @param parameters
   * example { paginator: { from: 0, size: 3 } }
   */
  public list(parameters?: IFiltersQueryParameters): ApiResponse<IApplication[]> {
    if (parameters) {
      const queryParameters = stringifyQueryObject(parameters)
      return this.client.get<IApplication[]>(`${this.path}?${queryParameters}`)
    }
    return this.client.get<IApplication[]>(this.path)
  }

  /**
   * This method will update the given application
   * Please bear in mind that this method requires specific permission in order to update the model
   * @param payload
   */
  public update(payload: IApplication): ApiResponse<IApplication> {
    return this.client.put<IApplication>(`${this.path}/${payload.id}`, payload)
  }
}
