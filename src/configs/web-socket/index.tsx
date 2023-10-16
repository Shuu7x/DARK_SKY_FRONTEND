import { io, Socket } from 'socket.io-client'
import { env } from '../env'
import React from 'react'

let client: Socket

export const webSocket = {
  connect: () => {
    return new Promise((resolve, reject) => {
      client = io(env.WEB_SOCKET_ENDPOINT, { transports: ['websocket'] })

      client.on('connect', () => {
        console.info('Socket connection had been established.')
        resolve('')
      })
      client.on('error', (err) => {
        console.error('Connection error: ', err)
        reject(err)
      })
      client.on('reconnect', () => {
        console.error('Reconnecting')
      })
    })
  },
  client: () => {
    return client
  },
}

interface WebSocketProviderProps {
  children: React.ReactElement
}

const WebSocketContext = React.createContext({})

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const webSocketConnectionHandler = React.useCallback(async () => {
    await webSocket.connect()

    const handler = (msg: string) => {
      console.log(msg)
    }

    webSocket.client().on('device/sensor/data', handler)
  }, [])

  React.useEffect(() => {
    webSocketConnectionHandler()
  }, [webSocketConnectionHandler])

  return <WebSocketContext.Provider value={{}}>{children}</WebSocketContext.Provider>
}
