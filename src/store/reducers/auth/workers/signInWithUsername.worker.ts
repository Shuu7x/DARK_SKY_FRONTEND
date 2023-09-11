import { IToken, IUser } from '@/entities'
import { IPayloadAction } from '@/interfaces'
import { authService, tokenService } from '@/services'
import { SIGN_IN_WITH_USERNAME_SUCCESS } from '@/store/actions'
import { call, delay, put } from 'redux-saga/effects'

export function* signInWithUsernameWorker({
  payload,
  reject,
  resolve,
}: IPayloadAction<Pick<IUser, 'username' | 'password'>>) {
  try {
    const token: IToken = yield call(authService.signInWithUsername, payload)
    yield call(tokenService.setToken, token.accessToken)
    const profile: Omit<IUser, 'password'> = yield call(authService.getProfile)
    yield delay(500)
    yield put(SIGN_IN_WITH_USERNAME_SUCCESS(profile))
    resolve(profile)
  } catch (e) {
    reject(e)
  }
}
