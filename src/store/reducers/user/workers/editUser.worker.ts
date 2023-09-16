import { IUser } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { userService } from '@/services'
import { EDIT_USER_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* editUserWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Pick<IUser, 'id' | 'role' | 'status'>>) {
  try {
    const result: Omit<IUser, 'password'> = yield call(userService.update, payload)
    yield put(EDIT_USER_SUCCESS(result))
    resolve(result)
  } catch (e) {
    reject(e)
  }
}
