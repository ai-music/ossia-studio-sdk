import { ApiResponse, ENDPOINT, IBusiness, IBusinessCreate, IHttpClient, IQueryParameters } from '../../../types'
import { stringifyQueryObject } from '../../../utils'

export class BusinessEndpoint {
  public path = `${ENDPOINT.BUSINESS}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method will allow you to create a business
   * @param payload
   */
  public create(payload: IBusinessCreate): ApiResponse<IBusiness> {
    return this.client.post<IBusinessCreate, IBusiness>(this.path, payload)
  }

  /**
   * This method will return the business model
   * @param businessId
   */
  public get(businessId: string): ApiResponse<IBusiness> {
    return this.client.get<IBusiness>(`${this.path}/${businessId}`)
  }

  /**
   * This method will return the business list
   * Please bear in mind that this method requires specific permission in order to receive the data
   * @param parameters
   * example { paginator: { from: 0, size: 3 } }
   */
  public list(parameters?: IQueryParameters): ApiResponse<IBusiness[]> {
    if (parameters) {
      const queryParameters = stringifyQueryObject(parameters)
      return this.client.get<IBusiness[]>(`${this.path}?${queryParameters}`)
    }
    return this.client.get<IBusiness[]>(this.path)
  }

  /**
   * This method will update the given application
   * Please bear in mind that this method requires specific permission in order to update the model
   * @param payload
   */
  public update(payload: IBusiness): ApiResponse<IBusiness> {
    return this.client.put<IBusiness>(`${this.path}/${payload.id}`, payload)
  }
}
