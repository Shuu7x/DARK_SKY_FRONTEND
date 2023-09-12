import { withPreload } from '@/configs'
import { DeviceScreen, DashboardScreen, LoginScreen, SidebarLayout, UserScreen } from '@/screens'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <Routes>
      {/* Redirect when not founded any screen */}
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/' element={<SidebarLayout />}>
        <Route path='dashboard' element={<DashboardScreen />} />
        <Route path='devices' element={<DeviceScreen />} />
        <Route path='users' element={<UserScreen />} />
        <Route path='/' element={<Navigate to='/dashboard' />} />
      </Route>
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}

export default withPreload(Router)
