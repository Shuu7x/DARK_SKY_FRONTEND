import { IUser } from '@/entities'
import { apiClient } from '@/libs'

export interface IUserService {
  changePassword(params: Pick<IUser, 'id' | 'password'>): Promise<void>
  create(params: Omit<IUser, 'id' | 'status'>): Promise<Omit<IUser, 'password'>>
  delete(params: Pick<IUser, 'id'>): Promise<void>
  getList(): Promise<Omit<IUser, 'password'>[]>
  getDetail(params: Pick<IUser, 'id'>): Promise<Omit<IUser, 'password'>>
  update(params: Pick<IUser, 'id' | 'role' | 'status'>): Promise<Omit<IUser, 'password'>>
}

export const userService: IUserService = {
  changePassword: function (params: Pick<IUser, 'id' | 'password'>): Promise<void> {
    const { id, ...body } = params
    return apiClient.patch(`/users/${id}/password`, body)
  },
  create: function (params: Omit<IUser, 'id' | 'status'>): Promise<Omit<IUser, 'password'>> {
    return apiClient.post('/users', params)
  },
  delete: function (params: Pick<IUser, 'id'>): Promise<void> {
    return apiClient.delete(`/users/${params.id}`)
  },
  getList: function (): Promise<Omit<IUser, 'password'>[]> {
    return apiClient.get('/users')
  },
  getDetail: function (params: Pick<IUser, 'id'>): Promise<Omit<IUser, 'password'>> {
    return apiClient.get(`/users/${params.id}`)
  },
  update: function (
    params: Pick<IUser, 'id' | 'role' | 'status'>,
  ): Promise<Omit<IUser, 'password'>> {
    const { id, ...body } = params
    return apiClient.put(`/users/${id}`, body)
  },
}
