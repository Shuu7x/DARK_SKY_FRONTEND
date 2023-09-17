import { IDevice } from '@/entities'
import { apiClient } from '@/libs'

export interface IDeviceService {
  create(params: Pick<IDevice, 'no' | 'location' | 'name' | 'master'>): Promise<IDevice>
  delete(params: Pick<IDevice, 'id'>): Promise<void>
  getList(): Promise<IDevice[]>
  getDetail(params: Pick<IDevice, 'id'>): Promise<IDevice>
  update(params: Pick<IDevice, 'location' | 'name' | 'master' | 'id' | 'meta'>): Promise<IDevice>
}

export const deviceService: IDeviceService = {
  create: function (
    params: Pick<IDevice, 'no' | 'location' | 'name' | 'master'>,
  ): Promise<IDevice> {
    return apiClient.post('/devices', params)
  },
  delete: function (params: Pick<IDevice, 'id'>): Promise<void> {
    return apiClient.delete(`/devices${params.id}`)
  },
  getList: function (): Promise<IDevice[]> {
    return apiClient.get('/devices')
  },
  getDetail: function (params: Pick<IDevice, 'id'>): Promise<IDevice> {
    return apiClient.get(`/devices${params.id}`)
  },
  update: function (
    params: Pick<IDevice, 'location' | 'name' | 'master' | 'id' | 'meta'>,
  ): Promise<IDevice> {
    const { id, ...body } = params
    return apiClient.put(`/devices${id}`, body)
  },
}
