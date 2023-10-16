/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDeviceChannel } from './deviceChannel'

export type DeviceStatus = 'CONNECTED' | 'DISCONNECTED'

export interface IDevice {
  id?: string
  no: string
  status: DeviceStatus
  location: string
  name: string
  master: string | null
  children?: IDevice[]
  channels?: IDeviceChannel[]
  meta?: Record<string, any>
}
