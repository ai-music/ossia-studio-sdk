import { ENDPOINT, ApiResponse, IHttpClient, IVocalTrack, IVocalTrackCreate, IQueryParameters, TAudioFile } from '../../../types'
import { stringifyQueryObject, uploadFileWithAwsPolicy } from '../../../utils'

export class VocalTrackEndpoint {
  public path = `${ENDPOINT.VOCAL_TRACKS}`
  constructor(protected readonly client: IHttpClient) {}

  /**
   * This method allows you to create a new vocalTrack
   * @param payload
   * @param vocalTrackFile
   */
  public async create(payload: IVocalTrackCreate, vocalTrackFile: TAudioFile): ApiResponse<IVocalTrack> {
    const vocalTrackResponse = await this.client.post<IVocalTrackCreate, IVocalTrack>(this.path, payload)
    await uploadFileWithAwsPolicy(vocalTrackResponse.data.uploadPolicy, vocalTrackFile, `vocal_tracks/${vocalTrackResponse.data.id}/original.mp3`)
    return vocalTrackResponse
  }

  /**
   * This method returns the vocalTrack model matching the vocalTrackId param
   * @param vocalTrackId
   */
  public get(vocalTrackId: string): ApiResponse<IVocalTrack> {
    return this.client.get<IVocalTrack>(`${this.path}/${vocalTrackId}`)
  }

  /**
   * This method returns a list of all the vocalTracks
   * @param parameters
   * parameter for pagination, etc. (e.g. { paginator: { from: 0, size 15 } })
   */
  public list(parameters?: IQueryParameters): ApiResponse<IVocalTrack[]> {
    if (parameters) {
      const queryParameters = stringifyQueryObject(parameters)
      return this.client.get<IVocalTrack[]>(`${this.path}?${queryParameters}`)
    }
    return this.client.get<IVocalTrack[]>(this.path)
  }

  /**
   * This method updates the vocalTrack model matching the ID of the payload model
   * @param payload
   */
  public update(payload: IVocalTrack): ApiResponse<IVocalTrack> {
    return this.client.put<IVocalTrack>(`${this.path}/${payload.id}`, payload)
  }
}
