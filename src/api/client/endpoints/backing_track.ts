import { ENDPOINT, IHttpClient, ApiResponse, IBackingTrackCreate, IBackingTrack, IBackingTrackQueryParameters, TAudioFile } from '../../../types'
import { stringifyQueryObject, uploadFileWithAwsPolicy } from '../../../utils'

export class BackingTrackEndpoint {
  public path = `${ENDPOINT.BACKING_TRACKS}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method will allow you to create a backing track
   * @param payload
   * @param originalTrack
   * @param previewTrack
   */
  public async create(payload: IBackingTrackCreate, originalTrack: TAudioFile, previewTrack: TAudioFile): ApiResponse<IBackingTrack> {
    const response = this.client.post<IBackingTrackCreate, IBackingTrack>(this.path, payload)
    const { data } = await response
    await Promise.all([
      uploadFileWithAwsPolicy(data.uploadPolicy, originalTrack, `backing_tracks/${data.id}/original.wav`),
      uploadFileWithAwsPolicy(data.uploadPolicy, previewTrack, `backing_tracks/${data.id}/preview.mp3`),
    ])
    return response
  }

  /**
   * This method will return the backing track model
   * @param backingTrackId
   */
  public read(backingTrackId?: string): ApiResponse<IBackingTrack> {
    return this.client.get<IBackingTrack>(`${this.path}/${backingTrackId}`)
  }

  /**
   * This method will return the backing tracks list depending on the filters provided
   * @param parameters
   * example { paginator: { from: 0, size: 3 }, filters: { musicStyle: ["ROCK"] } }
   */
  public list(parameters?: IBackingTrackQueryParameters): ApiResponse<IBackingTrack[]> {
    if (parameters) {
      const queryParameters = stringifyQueryObject(parameters)
      return this.client.get<IBackingTrack[]>(`${this.path}?${queryParameters}`)
    }
    return this.client.get<IBackingTrack[]>(this.path)
  }

  /**
   * This method will update the given backing track
   * Please bear in mind that this method requires specific permission in order to update the model
   * @param payload
   */
  public update(payload: IBackingTrack): ApiResponse<IBackingTrack> {
    return this.client.put<IBackingTrack>(`${this.path}/${payload.id}`, payload)
  }
}
