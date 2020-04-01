import Axios, { AxiosRequestConfig } from 'axios'
import { HOST, IApiResponse, IHttpClient } from '../types'
import { ApiError } from '../api/client/errors'

export class HttpClient implements IHttpClient {
  constructor(protected jwt?: string | null) {}

  public setJWT(token: string): void {
    this.jwt = token
  }

  public post<T>(endpoint: string, payload: Partial<T>): Promise<IApiResponse<T>> {
    return Axios.post(`${HOST.API}/${endpoint}`, payload, this.getRequestConfig())
      .then(({ data, ...request }) => ({ ...data, status: request.status }))
      .catch(error => {
        let message = ''
        let statusCode = null
        if (!error.response || !error.response.data) {
          message = `Api client network error: ${error.toString()}`
        } else {
          statusCode = error.response.data.statusCode
          message = error.response.data.message
        }
        throw ApiError.invalidResponse(message, endpoint, 'post', statusCode)
      })
  }

  protected getRequestConfig(): AxiosRequestConfig {
    // Default settings
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (this.jwt) {
      config.headers.Authorization = `Bearer ${this.jwt}`
    }
    return config
  }
}
