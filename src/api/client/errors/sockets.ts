const ERROR_MESSAGE = {
  CONNECTION_ERROR: (message: string): string => `Sockets connection error: ${message}`,
}

export class SocketsError extends Error {
  public readonly message: string
  public readonly statusCode: number
  public readonly endpoint: string
  public readonly method: string

  protected constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, SocketsError.prototype)
  }

  public static connectionError(message: string): SocketsError {
    return new SocketsError(ERROR_MESSAGE.CONNECTION_ERROR(message))
  }
}
