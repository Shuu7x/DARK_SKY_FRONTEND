import { IDevice } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { deviceService } from '@/services'
import { GET_DEVICE_DETAIL_CANCEL_SUCCESS, GET_DEVICE_DETAIL_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* getDeviceDetailWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Pick<IDevice, 'id'>>) {
  try {
    const result: IDevice = yield call(deviceService.getDetail, payload)
    yield put(GET_DEVICE_DETAIL_SUCCESS(result))
    resolve(result)
  } catch (e) {
    reject(e)
  }
}

export function* getDeviceDetailCancelWorker({ reject, resolve }: IPayloadAction<void>) {
  try {
    yield put(GET_DEVICE_DETAIL_CANCEL_SUCCESS())
    resolve()
  } catch (e) {
    reject(e)
  }
}
