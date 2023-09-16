import { IUserReducerState } from '@/interfaces'
import {
  CREATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  GET_USER_DETAIL_CANCEL_SUCCESS,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_LIST_SUCCESS,
} from '@/store/actions'
import { createReducer } from '@reduxjs/toolkit'

const initState: IUserReducerState = {
  detail: null,
  list: [],
}

export const userReducer = createReducer(initState, (builder) =>
  builder
    .addCase(CREATE_USER_SUCCESS, (state, { payload }) => {
      state.list = [...state.list, payload]
    })
    .addCase(EDIT_USER_SUCCESS, (state, { payload }) => {
      const list = state.list.map((e) => (e.id === payload.id ? payload : e))
      state.list = list
    })
    .addCase(DELETE_USER_SUCCESS, (state, { payload }) => {
      const deleteIndex = state.list.findIndex((e) => (e.id = payload.id))
      const list = state.list.splice(deleteIndex, 1)
      state.list = [...list]
    })
    .addCase(GET_USER_DETAIL_CANCEL_SUCCESS, (state) => {
      state.detail = null
    })
    .addCase(GET_USER_DETAIL_SUCCESS, (state, { payload }) => {
      state.detail = payload
    })
    .addCase(GET_USER_LIST_SUCCESS, (state, { payload }) => {
      state.list = payload
    }),
)
