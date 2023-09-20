import { IDevice } from '@/entities'
import { createAction } from '@reduxjs/toolkit'

const ACTION_NAME = '@/DEVICE'

export const CREATE_DEVICE_REQ = createAction<Pick<IDevice, 'no' | 'location' | 'name' | 'master'>>(
  `${ACTION_NAME}/CREATE_DEVICE_REQ`,
)
export const CREATE_DEVICE_SUCCESS = createAction<IDevice>(`${ACTION_NAME}/CREATE_DEVICE_SUCCESS`)

export const DELETE_DEVICE_REQ = createAction<Pick<IDevice, 'id'>>(
  `${ACTION_NAME}/DELETE_DEVICE_REQ`,
)
export const DELETE_DEVICE_SUCCESS = createAction<Pick<IDevice, 'id'>>(
  `${ACTION_NAME}/DELETE_DEVICE_SUCCESS`,
)

export const EDIT_DEVICE_REQ = createAction<
  Pick<IDevice, 'location' | 'name' | 'master' | 'id' | 'meta'>
>(`${ACTION_NAME}/EDIT_DEVICE_REQ`)
export const EDIT_DEVICE_SUCCESS = createAction<IDevice>(`${ACTION_NAME}/EDIT_DEVICE_SUCCESS`)

export const GET_DEVICE_DETAIL_REQ = createAction<Pick<IDevice, 'id'>>(
  `${ACTION_NAME}/GET_DEVICE_DETAIL_REQ`,
)
export const GET_DEVICE_DETAIL_SUCCESS = createAction<IDevice>(
  `${ACTION_NAME}/GET_DEVICE_DETAIL_SUCCESS`,
)
export const GET_DEVICE_DETAIL_CANCEL_REQ = createAction(
  `${ACTION_NAME}/GET_DEVICE_DETAIL_CANCEL_REQ`,
)
export const GET_DEVICE_DETAIL_CANCEL_SUCCESS = createAction(
  `${ACTION_NAME}/GET_DEVICE_DETAIL_CANCEL_SUCCESS`,
)

export const GET_DEVICE_LIST_REQ = createAction(`${ACTION_NAME}/GET_DEVICE_LIST_REQ`)
export const GET_DEVICE_LIST_SUCCESS = createAction<IDevice[]>(
  `${ACTION_NAME}/GET_DEVICE_LIST_SUCCESS`,
)
