/* eslint-disable @typescript-eslint/no-explicit-any */

import { env } from '@/configs'
import { authService, tokenService } from '@/services'
import axios, { AxiosRequestHeaders } from 'axios'
import jwtDecode, { JwtPayload } from 'jwt-decode'

export const apiClient = axios.create({ baseURL: env.API_ENDPOINT, withCredentials: true })

apiClient.interceptors.request.use(async (req) => {
  const accessToken = await tokenService.getToken()
  if (!accessToken) {
    return req
  }

  const decode = jwtDecode<JwtPayload>(accessToken)
  const expiredAt = (decode?.exp ?? 0) * 1000
  const currentTime = new Date().getTime()
  const isExpired = expiredAt - currentTime < 0

  if (!isExpired || !decode?.exp) {
    req.headers = { ...req.headers, Authorization: `Bearer ${accessToken}` } as AxiosRequestHeaders
    return req
  }

  await tokenService.removeToken()
  const { accessToken: newAccessToken } = await authService.getNewAccessToken()
  await tokenService.setToken(newAccessToken)

  req.headers = { ...req.headers, Authorization: `Bearer ${newAccessToken}` } as AxiosRequestHeaders

  return req
})

apiClient.interceptors.response.use(
  (res) => {
    return res.data?.data || res.data || res
  },
  (error: any) => {
    return Promise.reject(error?.response?.data || error?.response || error)
  },
)
