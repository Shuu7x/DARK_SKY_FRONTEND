/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'
import { useDispatch as reduxDispatch } from 'react-redux'

export const useDispatch = () => {
  const dispatch = reduxDispatch()

  return useCallback(
    <T = any>(action: any) => {
      return new Promise<T>((resolve, reject) => dispatch({ ...action, resolve, reject }))
    },
    [dispatch],
  )
}
