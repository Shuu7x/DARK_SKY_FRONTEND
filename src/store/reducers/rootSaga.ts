import { all } from 'redux-saga/effects'
import { authWatcher } from './auth'
import { userWatcher } from './user'
import { deviceWatcher } from './device'

export function* rootSaga() {
  yield all([authWatcher(), deviceWatcher(), userWatcher()])
}
