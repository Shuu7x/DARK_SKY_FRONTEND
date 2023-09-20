import {
  CREATE_DEVICE_REQ,
  DELETE_DEVICE_REQ,
  EDIT_DEVICE_REQ,
  GET_DEVICE_DETAIL_CANCEL_REQ,
  GET_DEVICE_DETAIL_REQ,
  GET_DEVICE_LIST_REQ,
} from '@/store/actions'
import { all, takeEvery } from 'redux-saga/effects'
import {
  createDeviceWorker,
  deleteDeviceWorker,
  editDeviceWorker,
  getDeviceDetailCancelWorker,
  getDeviceDetailWorker,
  getDeviceListWorker,
} from './workers'

export function* deviceWatcher() {
  yield all([
    takeEvery(CREATE_DEVICE_REQ.type, createDeviceWorker),
    takeEvery(DELETE_DEVICE_REQ.type, deleteDeviceWorker),
    takeEvery(EDIT_DEVICE_REQ.type, editDeviceWorker),
    takeEvery(GET_DEVICE_DETAIL_CANCEL_REQ.type, getDeviceDetailCancelWorker),
    takeEvery(GET_DEVICE_DETAIL_REQ.type, getDeviceDetailWorker),
    takeEvery(GET_DEVICE_LIST_REQ.type, getDeviceListWorker),
  ])
}
