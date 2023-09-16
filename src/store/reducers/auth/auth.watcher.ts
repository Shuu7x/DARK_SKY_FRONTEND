import { FETCH_PROFILE_REQ, SIGN_IN_WITH_USERNAME_REQ } from '@/store/actions'
import { all, takeEvery } from 'redux-saga/effects'
import { getProfileWorker, signInWithUsernameWorker } from './workers'

export function* authWatcher() {
  yield all([
    takeEvery(FETCH_PROFILE_REQ.type, getProfileWorker),
    takeEvery(SIGN_IN_WITH_USERNAME_REQ.type, signInWithUsernameWorker),
  ])
}
