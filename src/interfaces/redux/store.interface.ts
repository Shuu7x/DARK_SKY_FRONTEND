/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction as ReduxPayloadAction } from '@reduxjs/toolkit'
import { IAuthReducerState, IDeviceReducerState, IUserReducerState } from './reducers'

export type IStoreState = {
  auth: IAuthReducerState
  device: IDeviceReducerState
  user: IUserReducerState
}

export interface IPayloadAction<T> extends ReduxPayloadAction<T> {
  resolve(cb?: any): void
  reject(err?: unknown): void
}
