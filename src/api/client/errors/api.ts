const ERROR_MESSAGE = {
  INVALID_INPUT: (message: string): string => `Invalid input provided: ${message}`,
  INVALID_RESPONSE: (message: string): string => `Invalid API response: ${message}`,
}

export class ApiError extends Error {
  public readonly message: string
  public readonly statusCode: number
  public readonly endpoint: string
  public readonly method: string

  constructor(message: string, endpoint: string, method: string, statusCode?: number) {
    super(message)
    this.statusCode = statusCode || null
    this.endpoint = endpoint
    this.method = method
    Object.setPrototypeOf(this, ApiError.prototype)
  }

  public static invalidInput(message: string, endpoint: string, method: string, statusCode?: number): ApiError {
    return new ApiError(ERROR_MESSAGE.INVALID_INPUT(message), endpoint, method, statusCode || null)
  }

  public static invalidResponse(message: string, endpoint: string, method: string, statusCode?: number): ApiError {
    return new ApiError(ERROR_MESSAGE.INVALID_RESPONSE(message), endpoint, method, statusCode || null)
  }
}
