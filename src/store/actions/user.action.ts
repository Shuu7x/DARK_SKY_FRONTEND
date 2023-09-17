import { IUser } from '@/entities'
import { createAction } from '@reduxjs/toolkit'

const ACTION_NAME = '@/USER'

export const CHANGE_USER_PASSWORD_REQ = createAction<Pick<IUser, 'id' | 'password'>>(
  `${ACTION_NAME}/CHANGE_USER_PASSWORD_REQ`,
)
export const CHANGE_USER_PASSWORD_SUCCESS = createAction(
  `${ACTION_NAME}/CHANGE_USER_PASSWORD_SUCCESS`,
)

export const CREATE_USER_REQ = createAction<Omit<IUser, 'status' | 'id'>>(
  `${ACTION_NAME}/CREATE_USER_REQ`,
)
export const CREATE_USER_SUCCESS = createAction<Omit<IUser, 'password'>>(
  `${ACTION_NAME}/CREATE_USER_SUCCESS`,
)

export const DELETE_USER_REQ = createAction<Pick<IUser, 'id'>>(`${ACTION_NAME}/DELETE_USER_REQ`)
export const DELETE_USER_SUCCESS = createAction<Pick<IUser, 'id'>>(
  `${ACTION_NAME}/DELETE_USER_SUCCESS`,
)

export const EDIT_USER_REQ = createAction<Pick<IUser, 'id' | 'status' | 'role'>>(
  `${ACTION_NAME}/EDIT_USER_REQ`,
)
export const EDIT_USER_SUCCESS = createAction<Omit<IUser, 'password'>>(
  `${ACTION_NAME}/EDIT_USER_SUCCESS`,
)

export const GET_USER_DETAIL_REQ = createAction<Pick<IUser, 'id'>>(
  `${ACTION_NAME}/GET_USER_DETAIL_REQ`,
)
export const GET_USER_DETAIL_SUCCESS = createAction<Omit<IUser, 'password'>>(
  `${ACTION_NAME}/GET_USER_DETAIL_SUCCESS`,
)
export const GET_USER_DETAIL_CANCEL_REQ = createAction(`${ACTION_NAME}/GET_USER_DETAIL_CANCEL_REQ`)
export const GET_USER_DETAIL_CANCEL_SUCCESS = createAction(
  `${ACTION_NAME}/GET_USER_DETAIL_CANCEL_SUCCESS`,
)

export const GET_USER_LIST_REQ = createAction(`${ACTION_NAME}/GET_USER_LIST_REQ`)
export const GET_USER_LIST_SUCCESS = createAction<Omit<IUser, 'password'>[]>(
  `${ACTION_NAME}/GET_USER_LIST_SUCCESS`,
)
