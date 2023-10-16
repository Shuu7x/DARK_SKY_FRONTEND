import { IDeviceChannelState } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { deviceService } from '@/services'
import { GET_DEVICE_STATE_LIST_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* getDeviceStateListWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Record<string, string | number>>) {
  try {
    const result: IDeviceChannelState[] = yield call(deviceService.getDeviceStateList, payload)
    yield put(GET_DEVICE_STATE_LIST_SUCCESS(result))
    resolve(result)
  } catch (e) {
    reject(e)
  }
}
