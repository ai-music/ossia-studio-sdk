import {
  ENDPOINT,
  IHttpClient,
  ApiResponse,
  IBackingTrackCreate,
  IBackingTrack,
  IBackingTrackQueryParameters,
  TAudioFile,
  IAwsUploadPolicy,
} from '../../../types'
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
    await this.uploadBackingTrack(data.id, data.uploadPolicy, originalTrack, previewTrack)
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

  /**
   * This method will upload the track
   * Please bear in mind that this method requires specific permission in order to update the model
   * @param trackId
   * @param uploadPolicy
   * @param originalTrack
   * @param previewTrack
   */
  public async uploadBackingTrack(
    trackId: string,
    uploadPolicy: IAwsUploadPolicy,
    originalTrack?: TAudioFile,
    previewTrack?: TAudioFile,
  ): Promise<number | number[]> {
    if (originalTrack && !previewTrack) {
      return await uploadFileWithAwsPolicy(uploadPolicy, originalTrack, `backing_tracks/${trackId}/original.wav`)
    }
    if (!originalTrack && previewTrack) {
      return await uploadFileWithAwsPolicy(uploadPolicy, previewTrack, `backing_tracks/${trackId}/original.mp3`)
    }
    return await Promise.all([
      uploadFileWithAwsPolicy(uploadPolicy, originalTrack, `backing_tracks/${trackId}/original.wav`),
      uploadFileWithAwsPolicy(uploadPolicy, previewTrack, `backing_tracks/${trackId}/preview.mp3`),
    ])
  }
}
