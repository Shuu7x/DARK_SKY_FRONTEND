import { IUser } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { userService } from '@/services'
import { GET_USER_DETAIL_CANCEL_SUCCESS, GET_USER_DETAIL_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* getUserDetailWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Pick<IUser, 'id'>>) {
  try {
    const result: Omit<IUser, 'password'> = yield call(userService.getDetail, payload)
    yield put(GET_USER_DETAIL_SUCCESS(result))
    resolve(result)
  } catch (e) {
    reject(e)
  }
}

export function* getUserDetailCancelWorker({ reject, resolve }: IPayloadAction<void>) {
  try {
    yield put(GET_USER_DETAIL_CANCEL_SUCCESS())
    resolve()
  } catch (e) {
    reject(e)
  }
}
