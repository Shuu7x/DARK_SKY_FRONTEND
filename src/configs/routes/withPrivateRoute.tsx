/* eslint-disable react/display-name */
import { useAuth } from '@/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom'

export function withPrivateRoute(
  Component: React.ComponentType,
  type: 'GRANT_ACCESSIBLE' | 'GRANT_UNACCESSIBLE' | 'NOT_GRANT_ACCESSIBLE' = 'GRANT_ACCESSIBLE',
) {
  const GrantAccessibleRoute = () => {
    const { profile } = useAuth()
    return <React.Fragment>{profile ? <Component /> : <Navigate to='/login' />}</React.Fragment>
  }

  const GrantUnaccessible = () => {
    const { profile } = useAuth()
    return <React.Fragment>{profile === null ? <Component /> : <Navigate to='/' />}</React.Fragment>
  }

  return () => {
    switch (type) {
      case 'GRANT_ACCESSIBLE':
        return <GrantAccessibleRoute />
      case 'GRANT_UNACCESSIBLE':
        return <GrantUnaccessible />
      default:
        return <Component />
    }
  }
}
