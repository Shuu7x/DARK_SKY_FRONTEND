import { IDevice } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { deviceService } from '@/services'
import { GET_DEVICE_LIST_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* getDeviceListWorker({ reject, resolve }: IPayloadAction<void>) {
  try {
    const result: IDevice[] = yield call(deviceService.getList)
    yield put(GET_DEVICE_LIST_SUCCESS(result))
    resolve(result)
  } catch (e) {
    reject(e)
  }
}
