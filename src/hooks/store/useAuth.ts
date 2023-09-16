import React from 'react'
import { IUser } from '@/entities'
import { FETCH_PROFILE_REQ, SIGN_IN_WITH_USERNAME_REQ } from '@/store/actions'
import { useDispatch, useSelector } from '../redux'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.auth)

  const getProfile = React.useCallback(
    () => dispatch<Omit<IUser, 'password'>>(FETCH_PROFILE_REQ()),
    [dispatch],
  )

  const signInWithUsername = React.useCallback(
    (params: Pick<IUser, 'username' | 'password'>) =>
      dispatch<Omit<IUser, 'password'>>(SIGN_IN_WITH_USERNAME_REQ(params)),
    [dispatch],
  )

  return { profile, getProfile, signInWithUsername }
}
