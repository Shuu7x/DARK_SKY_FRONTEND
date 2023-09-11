/* eslint-disable @typescript-eslint/no-explicit-any */
import { rootSaga, rootReducer } from './reducers'
import createSagaMiddleware, { SagaMiddleware } from '@redux-saga/core'
import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import { IStoreState } from '@/interfaces'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore<IStoreState, any, MiddlewareArray<SagaMiddleware<object>[]>>({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga).toPromise()
