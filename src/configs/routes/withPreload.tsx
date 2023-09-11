/* eslint-disable react/display-name */
import { useAuth } from '@/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function withPreload(Component: React.ComponentType) {
  return () => {
    const [isLoad, setIsLoad] = useState(true)
    const navigate = useNavigate()

    const { onFetchProfile } = useAuth()

    const onLoad = useCallback(async () => {
      try {
        setIsLoad(true)
        await onFetchProfile()
      } catch {
        navigate('/login')
      } finally {
        setIsLoad(false)
      }
    }, [navigate, onFetchProfile])

    useEffect(() => {
      onLoad()
    }, [onLoad])

    return <React.Fragment>{isLoad ? <>loading</> : <Component />}</React.Fragment>
  }
}
