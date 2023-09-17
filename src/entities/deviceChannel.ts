import { IDeviceChannelState } from './deviceChannelState'

export interface IDeviceChannel {
  id?: string
  name: string
  topic: string
  prevState: IDeviceChannelState | null
  currentState: IDeviceChannelState | null
  device: string
}
