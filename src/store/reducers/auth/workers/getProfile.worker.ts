import { IUser } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { authService } from '@/services'
import { FETCH_PROFILE_SUCCESS } from '@/store/actions'
import { call, put } from 'redux-saga/effects'

export function* fetchProfileWorker({ resolve, reject }: IPayloadAction<void>) {
  try {
    const profile: Omit<IUser, 'password'> = yield call(authService.getProfile)
    yield put(FETCH_PROFILE_SUCCESS(profile))
    resolve(profile)
  } catch (e) {
    reject(e)
    console.log(e)
  }
}
