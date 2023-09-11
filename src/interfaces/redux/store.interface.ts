/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction as ReduxPayloadAction } from '@reduxjs/toolkit'
import { IAuthReducerState } from './reducers'

export type IStoreState = {
  auth: IAuthReducerState
}

export interface IPayloadAction<T> extends ReduxPayloadAction<T> {
  resolve(cb?: any): void
  reject(err?: unknown): void
}
