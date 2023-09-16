import { IUser } from '@/entities'

export interface IUserReducerState {
  detail: Omit<IUser, 'password'> | null
  list: Omit<IUser, 'password'>[]
}
