import { ENDPOINT, ApiResponse, IHttpClient, ICampaign, ICampaignCreate, IQueryParameters, STATE } from '../../../types'
import { stringifyQueryObject } from '../../../utils'

export class CampaignEndpoint {
  public path = `${ENDPOINT.CAMPAIGNS}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method allows you to create a new campaign
   * @param payload
   */
  public create(payload: ICampaignCreate): ApiResponse<ICampaign> {
    return this.client.post<ICampaignCreate, ICampaign>(this.path, payload)
  }

  /**
   * This method returns the campaign model
   * @param campaignId
   */
  public read(campaignId: string): ApiResponse<ICampaign> {
    return this.client.get<ICampaign>(`${this.path}/${campaignId}`)
  }

  /**
   * This method returns a list of all the campaigns
   * @param parameters
   * parameter for pagination, etc. (e.g. { paginator: { from: 0, size 15 } })
   */
  public list(parameters?: IQueryParameters): ApiResponse<ICampaign[]> {
    if (parameters) {
      const queryParameters = stringifyQueryObject(parameters)
      return this.client.get<ICampaign[]>(`${this.path}?${queryParameters}`)
    }
    return this.client.get<ICampaign[]>(this.path)
  }

  /**
   * This method will update a single campaign
   * @param payload
   */
  public update(payload: ICampaign): ApiResponse<ICampaign> {
    return this.client.put<ICampaign>(`${this.path}/${payload.id}`, payload)
  }

  /**
   * This method will update a single campaign to state 'DELETED'
   * @param payload
   */
  public delete(payload: ICampaign): ApiResponse<ICampaign> {
    payload.state = STATE.DELETED
    return this.client.put<ICampaign>(`${this.path}/${payload.id}`, payload)
  }
}
