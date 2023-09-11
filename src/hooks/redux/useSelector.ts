import { IStoreState } from '@/interfaces'
import { TypedUseSelectorHook, useSelector as ReduxSelector } from 'react-redux'

export const useSelector: TypedUseSelectorHook<IStoreState> = ReduxSelector
