import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { HOST, HTTP_METHOD, IApiResponse, IHttpClient } from '../types'
import { ApiError } from '../api/client/errors'

export class HttpClient implements IHttpClient {
  protected api: string = process.env.API_HOST || HOST.API
  constructor(protected jwt?: string | null) {}

  public setJWT(token: string): void {
    this.jwt = token
  }

  public post<T>(endpoint: string, payload: Partial<T>): Promise<IApiResponse<T>> {
    return Axios.post(`${this.api}/${endpoint}`, payload, this.getRequestConfig())
      .then(({ data, ...request }) => ({ ...data, status: request.status }))
      .catch(error => this.errorParser(error, endpoint, HTTP_METHOD.POST))
  }

  public get<T>(endpoint: string, parameters?: any): Promise<IApiResponse<T>> {
    return Axios.get(`${this.api}/${endpoint}`, {
      params: parameters || null,
      ...this.getRequestConfig(),
    })
      .then(({ data, ...request }) => ({ ...data, status: request.status }))
      .catch(error => this.errorParser(error, endpoint, HTTP_METHOD.GET))
  }

  public put<T>(endpoint: string, payload: Partial<T>): Promise<IApiResponse<T>> {
    return Axios.put(`${this.api}/${endpoint}`, payload, this.getRequestConfig())
      .then(({ data, ...request }) => ({ ...data, status: request.status }))
      .catch(error => this.errorParser(error, endpoint, HTTP_METHOD.PUT))
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
