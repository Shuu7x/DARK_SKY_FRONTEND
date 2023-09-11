import { IAuthReducerState } from '@/interfaces'
import { createReducer } from '@reduxjs/toolkit'
import { FETCH_PROFILE_SUCCESS, SIGN_IN_WITH_USERNAME_SUCCESS } from '../../actions'

const initAuthState: IAuthReducerState = {
  profile: null,
}

export const authReducer = createReducer(initAuthState, (builder) =>
  builder
    .addCase(FETCH_PROFILE_SUCCESS, (state, { payload }) => {
      state.profile = payload
    })
    .addCase(SIGN_IN_WITH_USERNAME_SUCCESS, (state, { payload }) => {
      state.profile = payload
    }),
)
