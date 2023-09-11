import { IUser } from '@/entities'

export interface IAuthReducerState {
  profile: Omit<IUser, 'password'> | null
}
