import React from 'react'
import { useDispatch, useSelector } from '../redux'
import {
  CHANGE_USER_PASSWORD_REQ,
  CREATE_USER_REQ,
  DELETE_USER_REQ,
  EDIT_USER_REQ,
  GET_USER_DETAIL_CANCEL_REQ,
  GET_USER_DETAIL_REQ,
  GET_USER_LIST_REQ,
} from '@/store/actions'
import { IUser } from '@/entities'

export const useUser = () => {
  const { detail, list } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const cancelGetUserDetail = React.useCallback(
    () => dispatch<Omit<IUser, 'password'>>(GET_USER_DETAIL_CANCEL_REQ()),
    [dispatch],
  )

  const changePassword = React.useCallback(
    (params: Pick<IUser, 'id' | 'password'>) => dispatch(CHANGE_USER_PASSWORD_REQ(params)),
    [dispatch],
  )

  const createUser = React.useCallback(
    (params: Omit<IUser, 'id' | 'status'>) =>
      dispatch<Omit<IUser, 'password'>>(CREATE_USER_REQ(params)),
    [dispatch],
  )

  const editUser = React.useCallback(
    (params: Pick<IUser, 'id' | 'role' | 'status'>) =>
      dispatch<Omit<IUser, 'password'>>(EDIT_USER_REQ(params)),
    [dispatch],
  )

  const deleteUser = React.useCallback(
    (params: Pick<IUser, 'id'>) => dispatch<Pick<IUser, 'id'>>(DELETE_USER_REQ(params)),
    [dispatch],
  )

  const getUserDetail = React.useCallback(
    (params: Pick<IUser, 'id'>) => dispatch<Omit<IUser, 'password'>>(GET_USER_DETAIL_REQ(params)),
    [dispatch],
  )

  const getUserList = React.useCallback(
    () => dispatch<Omit<IUser, 'password'>[]>(GET_USER_LIST_REQ()),
    [dispatch],
  )

  return {
    detail,
    list,
    cancelGetUserDetail,
    changePassword,
    createUser,
    editUser,
    deleteUser,
    getUserDetail,
    getUserList,
  }
}
