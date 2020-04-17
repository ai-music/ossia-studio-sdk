import { ENDPOINT, ApiResponse, IHttpClient, IRemixTrack, IRemixTrackCreate, IQueryParameters, ITrackAudioFiles } from '../../../types'
import { stringifyQueryObject, uploadFileWithAwsPolicy } from '../../../utils'

export class RemixTrackEndpoint {
  public path = `${ENDPOINT.REMIX_TRACKS}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method allows you to create a new remix track
   * @param payload
   */
  public async create(payload: IRemixTrackCreate & ITrackAudioFiles): ApiResponse<IRemixTrack> {
    const { originalTrackAudio, ...rest } = payload
    const response = this.client.post<IRemixTrackCreate, IRemixTrack>(this.path, rest)
    const { data } = await response
    await uploadFileWithAwsPolicy(data.uploadPolicy, originalTrackAudio)
    return response
  }

  /**
   * This method returns the remixTrack model
   * @param remixTrackId
   */
  public get(remixTrackId: string): ApiResponse<IRemixTrack> {
    return this.client.get<IRemixTrack>(`${this.path}/${remixTrackId}`)
  }

  /**
   * This method returns a list of all the remixTracks
   * @param parameters
   * parameter for pagination, etc. (e.g. { paginator: { from: 0, size 15 } })
   */
  public list(parameters?: IQueryParameters): ApiResponse<IRemixTrack[]> {
    if (parameters) {
      const queryParameters = stringifyQueryObject(parameters)
      return this.client.get<IRemixTrack[]>(`${this.path}?${queryParameters}`)
    }
    return this.client.get<IRemixTrack[]>(this.path)
  }
}
