import { withPrivateRoute } from '@/configs'
import React from 'react'

const ErrorScreenComponent: React.FC = () => {
  return <div>ErrorScreen</div>
}

export const ErrorScreen = withPrivateRoute(ErrorScreenComponent, 'NOT_GRANT_ACCESSIBLE')
