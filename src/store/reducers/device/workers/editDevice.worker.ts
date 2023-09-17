import { IDevice } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { deviceService } from '@/services'
import { EDIT_DEVICE_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* editDeviceWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Pick<IDevice, 'location' | 'name' | 'master' | 'id' | 'meta'>>) {
  try {
    const result: IDevice = yield call(deviceService.update, payload)
    yield put(EDIT_DEVICE_SUCCESS(result))
    resolve(result)
  } catch (e) {
    reject(e)
  }
}
