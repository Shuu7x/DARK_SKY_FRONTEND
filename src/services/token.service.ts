export interface ITokenService {
  getToken(): Promise<string | null>
  setToken(value: string): Promise<void>
  removeToken(): Promise<void>
}

export const tokenService: ITokenService = {
  getToken: async (): Promise<string | null> => {
    const result = localStorage.getItem('accessToken') || null
    return result
  },
  setToken: async (value: string): Promise<void> => {
    return localStorage.setItem('accessToken', value)
  },
  removeToken: async (): Promise<void> => {
    return localStorage.removeItem('accessToken')
  },
}
