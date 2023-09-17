import { IDevice } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { deviceService } from '@/services'
import { CREATE_DEVICE_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* createDeviceWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Pick<IDevice, 'no' | 'location' | 'name' | 'master'>>) {
  try {
    const result: IDevice = yield call(deviceService.create, payload)
    yield put(CREATE_DEVICE_SUCCESS(result))
    resolve(result)
  } catch (e) {
    reject(e)
  }
}
