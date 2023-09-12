/* eslint-disable react/display-name */
import { useAuth } from '@/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function withPreload(Component: React.ComponentType) {
  return () => {
    const [isLoad, setIsLoad] = useState(true)
    const navigate = useNavigate()

    const { profile, onFetchProfile } = useAuth()

    const fetchProfileHandler = useCallback(async () => {
      try {
        if (profile) {
          return
        }
        setIsLoad(true)
        await onFetchProfile()
      } catch {
        navigate('/login')
      } finally {
        setIsLoad(false)
      }
    }, [profile, navigate, onFetchProfile])

    useEffect(() => {
      fetchProfileHandler()
    }, [fetchProfileHandler])

    return <React.Fragment>{isLoad ? <>loading</> : <Component />}</React.Fragment>
  }
}
