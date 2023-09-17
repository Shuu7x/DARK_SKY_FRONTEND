import { IDevice } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { deviceService } from '@/services'
import { DELETE_DEVICE_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* deleteDeviceWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Pick<IDevice, 'id'>>) {
  try {
    yield call(deviceService.delete, payload)
    yield put(DELETE_DEVICE_SUCCESS(payload))
    resolve()
  } catch (e) {
    reject(e)
  }
}
