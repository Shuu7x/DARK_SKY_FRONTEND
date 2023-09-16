import { IUser } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { userService } from '@/services'
import { CREATE_USER_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* createUserWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Omit<IUser, 'id' | 'status'>>) {
  try {
    const result: Omit<IUser, 'password'> = yield call(userService.create, payload)
    yield put(CREATE_USER_SUCCESS(result))
    resolve(result)
  } catch (e) {
    reject(e)
  }
}
