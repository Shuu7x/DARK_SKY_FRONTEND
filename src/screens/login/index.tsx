import { withPrivateRoute } from '@/configs'
import { LoginFormView } from '@/views'
import React from 'react'

const LoginScreen = () => {
  return (
    <div className='flex justify-center items-center h-screen w-full bg-slate-50'>
      <div className='w-96 flex flex-col shadow-2xl p-4 pt-8 rounded-xl bg-white'>
        <h1 className='font-bold text-4xl mb-8 text-sky-600'>Login to Dark Sky</h1>
        <LoginFormView />
      </div>
    </div>
  )
}

export default withPrivateRoute(LoginScreen, 'GRANT_UNACCESSIBLE')
