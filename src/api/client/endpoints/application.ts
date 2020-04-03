import { ENDPOINT, IApiResponse, IApplication, IHttpClient, IQueryParameters } from '../../../types'
import { stringifyQueryObject } from '../../../utils'

export class ApplicationEndpoint {
  public path = `${ENDPOINT.APPLICATIONS}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method will allow you to create an application
   * @param payload
   */
  public async create<IApplication>(payload: Partial<IApplication>): Promise<IApiResponse<IApplication>> {
    return this.client.post<IApplication>(this.path, payload)
  }

  /**
   * This method will return the application model
   * @param applicationId
   */
  public async get(applicationId?: string): Promise<IApiResponse<IApplication>> {
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
  public async list(parameters?: IQueryParameters): Promise<IApiResponse<IApplication[]>> {
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
  public async update(payload: Partial<IApplication>): Promise<IApiResponse<IApplication>> {
    return this.client.put<IApplication>(`${this.path}/${payload.id}`, payload)
  }
}
