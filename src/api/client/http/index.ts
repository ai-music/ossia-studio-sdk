import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { ApiResponse, HOST, HTTP_METHOD, IHttpClient, IIdentity } from '../../../types'
import { ApiError } from '../errors'

export class HttpClient implements IHttpClient {
  protected api: string = process.env.OSSIA_STUDIO_SDK_API_HOST || HOST.API
  protected jwt: string = null

  public setToken(identity: Partial<IIdentity>): void {
    this.jwt = identity.token
  }

  public post<T>(endpoint: string, payload: Partial<T>): ApiResponse<T> {
    return Axios.post(`${this.api}/${endpoint}`, payload, this.getRequestConfig())
      .then(({ data, ...request }) => ({ ...data, status: request.status }))
      .catch(error => this.errorParser(error, endpoint, HTTP_METHOD.POST))
  }

  public get<T>(endpoint: string, parameters?: unknown): ApiResponse<T> {
    return Axios.get(`${this.api}/${endpoint}`, {
      params: parameters || null,
      ...this.getRequestConfig(),
    })
      .then(({ data, ...request }) => ({ ...data, status: request.status }))
      .catch(error => this.errorParser(error, endpoint, HTTP_METHOD.GET))
  }

  public put<T>(endpoint: string, payload: T): ApiResponse<T> {
    return Axios.put(`${this.api}/${endpoint}`, payload, this.getRequestConfig())
      .then(({ data, ...request }) => ({ ...data, status: request.status }))
      .catch(error => this.errorParser(error, endpoint, HTTP_METHOD.PUT))
  }

  //TODO: @DT-893 - Temp patch/put method
  public patch<I, O>(endpoint: string, payload: I): ApiResponse<O> {
    return Axios.put(`${this.api}/${endpoint}`, payload, this.getRequestConfig())
      .then(({ data, ...request }) => ({ ...data, status: request.status }))
      .catch(error => this.errorParser(error, endpoint, HTTP_METHOD.PATCH))
  }

  protected getRequestConfig(): AxiosRequestConfig {
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

  protected errorParser(error: AxiosError, endpoint: string, method: string): Error {
    let message: string
    let statusCode = null
    if (!error.response || !error.response.data) {
      message = `Api client network error: ${error.toString()}`
    } else {
      statusCode = error.response.data.statusCode
      message = error.response.data.message
    }
    throw ApiError.invalidResponse(message, endpoint, method, statusCode)
  }
}
