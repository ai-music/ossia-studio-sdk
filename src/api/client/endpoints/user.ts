import {
  ApiResponse,
  ENDPOINT,
  IHttpClient,
  IUserCreate,
  IUserDashboard,
  IUserFavourites,
  IUserPayload,
  IUserActivate,
  IAdminDashboard,
} from '../../../types'

export class UserEndpoint {
  public path = `${ENDPOINT.USERS}`

  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method will allow you to create a user
   * @param payload
   */
  public create(payload: IUserCreate): ApiResponse<IUserPayload> {
    return this.client.post<IUserCreate, IUserPayload>(this.path, payload)
  }

  /**
   * This method will retrieve the authenticated user if called without a userId
   * Otherwise it will retrieve the user that matches the userId parameter
   * @param userId
   */
  public read(userId = ''): ApiResponse<IUserPayload> {
    return this.client.get<IUserPayload>(`${this.path}${userId && `/${userId}`}`)
  }

  /**
   * This method will retrieve a collection of users
   */
  public list(): ApiResponse<IUserPayload> {
    return this.client.get<IUserPayload>(`${this.path}`)
  }

  /**
   * This method will update the user model with the given payload
   * @param payload
   */
  public update(payload: IUserPayload): ApiResponse<IUserPayload> {
    return this.client.put<IUserPayload>(`${this.path}/${payload.id}`, payload)
  }

  /**
   * This method will activate the user matching the userId
   * @param payload
   */
  public activate(payload: IUserActivate, userId: string): ApiResponse<IUserPayload> {
    return this.client.patch<IUserActivate, IUserPayload>(`${this.path}/${userId}/${ENDPOINT.ACTIVATE}`, payload)
  }

  /**
   * This method will retrieve the data for a user's dashboard
   * @param userId
   */
  public dashboard(userId: string): ApiResponse<IUserDashboard | IAdminDashboard> {
    return this.client.get<IUserDashboard | IAdminDashboard, string>(`${this.path}/${userId}/${ENDPOINT.DASHBOARD}`)
  }

  /**
   * This method will add a backingTrack ID to a user's favourites collection
   * @param payload
   * @param userId
   */
  public favourites(payload: IUserFavourites, userId: string): ApiResponse<IUserPayload> {
    return this.client.post<IUserFavourites, IUserPayload>(`${this.path}/${userId}/${ENDPOINT.FAVOURITES}`, payload)
  }
}
