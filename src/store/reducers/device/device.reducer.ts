import { IDeviceReducerState } from '@/interfaces'
import {
  CREATE_DEVICE_SUCCESS,
  DELETE_DEVICE_SUCCESS,
  EDIT_DEVICE_SUCCESS,
  GET_DEVICE_DETAIL_CANCEL_SUCCESS,
  GET_DEVICE_DETAIL_SUCCESS,
  GET_DEVICE_LIST_SUCCESS,
} from '@/store/actions'
import { createReducer } from '@reduxjs/toolkit'

const initState: IDeviceReducerState = {
  detail: null,
  list: [],
}

export const deviceReducer = createReducer(initState, (builder) =>
  builder
    .addCase(CREATE_DEVICE_SUCCESS, (state, { payload }) => {
      state.list = [...state.list, payload]
    })
    .addCase(EDIT_DEVICE_SUCCESS, (state, { payload }) => {
      const list = state.list.map((e) => (e.id === payload.id ? payload : e))
      state.list = list
    })
    .addCase(DELETE_DEVICE_SUCCESS, (state, { payload }) => {
      const list = state.list.filter((e) => e.id !== payload.id)
      state.list = list
    })
    .addCase(GET_DEVICE_DETAIL_CANCEL_SUCCESS, (state) => {
      state.detail = null
    })
    .addCase(GET_DEVICE_DETAIL_SUCCESS, (state, { payload }) => {
      state.detail = payload
    })
    .addCase(GET_DEVICE_LIST_SUCCESS, (state, { payload }) => {
      state.list = payload
    }),
)
