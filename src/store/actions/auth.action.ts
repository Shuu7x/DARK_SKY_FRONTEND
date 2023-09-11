import { IUser } from '@/entities'
import { createAction } from '@reduxjs/toolkit'

const ACTION_NAME = '@/AUTH'

export const FETCH_PROFILE_REQ = createAction(`${ACTION_NAME}/FETCH_PROFILE_REQ`)
export const FETCH_PROFILE_SUCCESS = createAction<Omit<IUser, 'password'>>(
  `${ACTION_NAME}/FETCH_PROFILE_SUCCESS`,
)

export const SIGN_IN_WITH_USERNAME_REQ = createAction<Pick<IUser, 'username' | 'password'>>(
  `${ACTION_NAME}/SIGN_IN_WITH_USERNAME_REQ`,
)
export const SIGN_IN_WITH_USERNAME_SUCCESS = createAction<Omit<IUser, 'password'>>(
  `${ACTION_NAME}/SIGN_IN_WITH_USERNAME_SUCCESS`,
)

export const LOGOUT = createAction(`${ACTION_NAME}/LOGOUT`)
