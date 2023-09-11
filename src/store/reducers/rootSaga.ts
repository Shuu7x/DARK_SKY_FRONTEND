import { all } from 'redux-saga/effects'
import { authWatcher } from './auth'

export function* rootSaga() {
  try {
    yield all([authWatcher()])
  } catch (e) {
    console.log('e', e)
  }
}
