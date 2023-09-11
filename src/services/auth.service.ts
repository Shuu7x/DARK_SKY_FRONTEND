import { IToken, IUser } from '@/entities'
import { apiClient } from '@/libs'

export interface IAuthService {
  forgotPassword(param: Pick<IUser, 'username'>): Promise<void>
  getNewAccessToken(): Promise<IToken>
  getProfile(): Promise<Omit<IUser, 'password'>>
  signInWithUsername(params: Pick<IUser, 'username' | 'password'>): Promise<IToken>
  logout(): Promise<void>
}

export const authService: IAuthService = {
  forgotPassword: (param: Pick<IUser, 'username'>): Promise<void> => {
    return apiClient.post('/auth/forgot-password', param)
  },
  getNewAccessToken: function (): Promise<IToken> {
    return apiClient.get('/auth/refresh')
  },
  getProfile: (): Promise<Omit<IUser, 'password'>> => {
    return apiClient.get('/auth/profile')
  },
  signInWithUsername: (params: Pick<IUser, 'username' | 'password'>): Promise<IToken> => {
    return apiClient.post('/auth/login', params)
  },
  logout: (): Promise<void> => {
    return apiClient.get('/auth/logout')
  },
}
