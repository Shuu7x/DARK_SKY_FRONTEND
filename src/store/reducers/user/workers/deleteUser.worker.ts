import { IUser } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { userService } from '@/services'
import { DELETE_USER_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* deleteUserWorker({ payload, reject, resolve }: IPayloadAction<Pick<IUser, 'id'>>) {
  try {
    yield call(userService.delete, payload)
    yield put(DELETE_USER_SUCCESS(payload))
    resolve()
  } catch (e) {
    reject(e)
  }
}
