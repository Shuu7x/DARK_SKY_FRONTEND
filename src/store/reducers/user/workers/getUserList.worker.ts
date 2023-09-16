import { IUser } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { userService } from '@/services'
import { GET_USER_LIST_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* getUserListWorker({ reject, resolve }: IPayloadAction<void>) {
  try {
    const result: Omit<IUser, 'password'>[] = yield call(userService.getList)
    yield put(GET_USER_LIST_SUCCESS(result))
    resolve(result)
  } catch (e) {
    reject(e)
  }
}
