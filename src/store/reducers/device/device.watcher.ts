import * as DEVICE_ACTION from '@/store/actions'
import { all, takeEvery } from 'redux-saga/effects'
import * as DEVICE_WORKER from './workers'

export function* deviceWatcher() {
  yield all([
    takeEvery(DEVICE_ACTION.CREATE_DEVICE_REQ.type, DEVICE_WORKER.createDeviceWorker),
    takeEvery(DEVICE_ACTION.DELETE_DEVICE_REQ.type, DEVICE_WORKER.deleteDeviceWorker),
    takeEvery(DEVICE_ACTION.EDIT_DEVICE_REQ.type, DEVICE_WORKER.editDeviceWorker),
    takeEvery(
      DEVICE_ACTION.GET_DEVICE_DETAIL_CANCEL_REQ.type,
      DEVICE_WORKER.getDeviceDetailCancelWorker,
    ),
    takeEvery(DEVICE_ACTION.GET_DEVICE_DETAIL_REQ.type, DEVICE_WORKER.getDeviceDetailWorker),
    takeEvery(DEVICE_ACTION.GET_DEVICE_LIST_REQ.type, DEVICE_WORKER.getDeviceListWorker),

    takeEvery(DEVICE_ACTION.GET_DEVICE_STATE_LIST_REQ.type, DEVICE_WORKER.getDeviceStateListWorker),
  ])
}
