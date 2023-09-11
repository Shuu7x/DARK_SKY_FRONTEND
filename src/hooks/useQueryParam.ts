import { useEffect, useState } from 'react'

export const useQueryParam = <T = { [x: string]: string }>() => {
  const [queryParams, setQueryParams] = useState<T>({} as T)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = [...urlSearchParams.entries()].reduce<{ [key: string]: string }>(
      (accumulator, [key, value]) => ({ ...accumulator, [key]: value }),
      {},
    ) as T
    setQueryParams(params)
  }, [])

  return queryParams
}
