import { IDeviceReducerState } from '@/interfaces'
import * as DEVICE_ACTION from '@/store/actions'
import { createReducer } from '@reduxjs/toolkit'

const initState: IDeviceReducerState = {
  detail: null,
  list: [],
}

export const deviceReducer = createReducer(initState, (builder) =>
  builder
    .addCase(DEVICE_ACTION.CREATE_DEVICE_SUCCESS, (state, { payload }) => {
      state.list = [...state.list, payload]
    })
    .addCase(DEVICE_ACTION.EDIT_DEVICE_SUCCESS, (state, { payload }) => {
      const list = state.list.map((e) => (e.id === payload.id ? payload : e))
      state.list = list
    })
    .addCase(DEVICE_ACTION.DELETE_DEVICE_SUCCESS, (state, { payload }) => {
      const list = state.list.filter((e) => e.id !== payload.id)
      state.list = list
    })
    .addCase(DEVICE_ACTION.GET_DEVICE_DETAIL_CANCEL_SUCCESS, (state) => {
      state.detail = null
    })
    .addCase(DEVICE_ACTION.GET_DEVICE_DETAIL_SUCCESS, (state, { payload }) => {
      state.detail = payload
    })
    .addCase(DEVICE_ACTION.GET_DEVICE_LIST_SUCCESS, (state, { payload }) => {
      state.list = payload
    }),
)
