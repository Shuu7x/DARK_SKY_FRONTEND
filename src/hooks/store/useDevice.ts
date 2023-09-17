import React from 'react'
import { useDispatch, useSelector } from '../redux'
import {
  CREATE_DEVICE_REQ,
  DELETE_DEVICE_REQ,
  EDIT_DEVICE_REQ,
  GET_DEVICE_DETAIL_CANCEL_REQ,
  GET_DEVICE_DETAIL_REQ,
  GET_DEVICE_LIST_REQ,
} from '@/store/actions'
import { IDevice } from '@/entities'

export const useDevice = () => {
  const { detail, list } = useSelector((state) => state.device)
  const dispatch = useDispatch()

  const cancelGetDeviceDetail = React.useCallback(
    () => dispatch<IDevice>(GET_DEVICE_DETAIL_CANCEL_REQ()),
    [dispatch],
  )

  const createDevice = React.useCallback(
    (params: Pick<IDevice, 'no' | 'location' | 'name' | 'master'>) =>
      dispatch<IDevice>(CREATE_DEVICE_REQ(params)),
    [dispatch],
  )

  const editDevice = React.useCallback(
    (params: Pick<IDevice, 'location' | 'name' | 'master' | 'id' | 'meta'>) =>
      dispatch<IDevice>(EDIT_DEVICE_REQ(params)),
    [dispatch],
  )

  const deleteDevice = React.useCallback(
    (params: Pick<IDevice, 'id'>) => dispatch<Pick<IDevice, 'id'>>(DELETE_DEVICE_REQ(params)),
    [dispatch],
  )

  const getDeviceDetail = React.useCallback(
    (params: Pick<IDevice, 'id'>) => dispatch<IDevice>(GET_DEVICE_DETAIL_REQ(params)),
    [dispatch],
  )

  const getDeviceList = React.useCallback(
    () => dispatch<IDevice[]>(GET_DEVICE_LIST_REQ()),
    [dispatch],
  )

  return {
    detail,
    list,
    cancelGetDeviceDetail,
    createDevice,
    editDevice,
    deleteDevice,
    getDeviceDetail,
    getDeviceList,
  }
}
