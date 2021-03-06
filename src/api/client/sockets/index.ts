import ClientIO from 'socket.io-client'
import { HOST, ICampaign, IRemixTrack, IVocalTrack, WEBSOCKET_EVENT } from '../../../types'

/**
 * Socket client
 *
 * This class is a bridge to bind functions to sockets apis messages
 * If you need to bind a function to native events, you can use the following method:
 *
 * const socket = ApiClient.getWebSocket()
 * socket.client.on('connect_timeout',()=>{})
 *
 * List of native methods available:
 * connect_error, connect_timeout, connect, connecting, disconnect, error, reconnect, reconnect_attempt,
 * reconnect_failed, reconnect_error, reconnecting, ping, pong
 */
export class Socket {
  protected host: string = process.env.OSSIA_STUDIO_SDK_SOCKETS_HOST || HOST.SOCKETS
  public client: SocketIOClient.Socket

  constructor(protected readonly token: string, protected readonly userId: string) {}

  public connect(): void {
    const options = {
      query: {
        token: this.token,
        userId: this.userId,
      },
      reconnectionDelay: 6000,
      reconnectionDelayMax: 6000,
      reconnectionAttempts: 15,
    }
    this.client = ClientIO(`${this.host}`, options).connect()
  }

  public bindVocalTrack(resolver: (data: IVocalTrack) => unknown): void {
    this.isConnected()
    this.client.on(WEBSOCKET_EVENT.VOCAL_TRACK_READY, ({ data }: { data: IVocalTrack }) => resolver(data))
    this.client.on(WEBSOCKET_EVENT.VOCAL_TRACK_ERROR, ({ data }: { data: IVocalTrack }) => resolver(data))
  }

  public bindCampaignMaster(resolver: (data: ICampaign) => unknown): void {
    this.isConnected()
    this.client.on(WEBSOCKET_EVENT.CAMPAIGN_MASTER_ERROR, ({ data }: { data: ICampaign }) => resolver(data))
    this.client.on(WEBSOCKET_EVENT.CAMPAIGN_MASTER_READY, ({ data }: { data: ICampaign }) => resolver(data))
  }

  public bindRemixMaster(resolver: (data: IRemixTrack) => unknown): void {
    this.isConnected()
    this.client.on(WEBSOCKET_EVENT.REMIX_TRACK_MASTER_ERROR, ({ data }: { data: IRemixTrack }) => resolver(data))
    this.client.on(WEBSOCKET_EVENT.REMIX_TRACK_MASTER_READY, ({ data }: { data: IRemixTrack }) => resolver(data))
  }

  protected isConnected(): boolean {
    if (!this.client) {
      throw new Error('Socket is not connected')
    }
    return true
  }
}
