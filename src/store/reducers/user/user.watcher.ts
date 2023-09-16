import { all, takeEvery } from 'redux-saga/effects'
import {
  changeUserPasswordWorker,
  createUserWorker,
  deleteUserWorker,
  editUserWorker,
  getUserDetailCancelWorker,
  getUserDetailWorker,
  getUserListWorker,
} from './workers'
import {
  CHANGE_USER_PASSWORD_REQ,
  CREATE_USER_REQ,
  DELETE_USER_REQ,
  EDIT_USER_REQ,
  GET_USER_DETAIL_CANCEL_REQ,
  GET_USER_DETAIL_REQ,
  GET_USER_LIST_REQ,
} from '@/store/actions'

export function* userWatcher() {
  yield all([
    takeEvery(CHANGE_USER_PASSWORD_REQ.type, changeUserPasswordWorker),
    takeEvery(CREATE_USER_REQ.type, createUserWorker),
    takeEvery(DELETE_USER_REQ.type, deleteUserWorker),
    takeEvery(EDIT_USER_REQ.type, editUserWorker),
    takeEvery(GET_USER_DETAIL_CANCEL_REQ.type, getUserDetailCancelWorker),
    takeEvery(GET_USER_DETAIL_REQ.type, getUserDetailWorker),
    takeEvery(GET_USER_LIST_REQ.type, getUserListWorker),
  ])
}
