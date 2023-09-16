import { IUser } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { userService } from '@/services'
import { CHANGE_USER_PASSWORD_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* changeUserPasswordWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Pick<IUser, 'id' | 'password'>>) {
  try {
    yield call(userService.changePassword, payload)
    yield put(CHANGE_USER_PASSWORD_SUCCESS())
    resolve()
  } catch (e) {
    reject(e)
  }
}
