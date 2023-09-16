import { Header, Sidebar } from '@/components'
import React from 'react'
import { Outlet } from 'react-router-dom'

const SidebarLayout: React.FC = () => {
  const [open, setOpen] = React.useState(true)

  const toggleSidebar = React.useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <div className='flex h-screen w-screen'>
      <Sidebar open={open} toggleSidebar={toggleSidebar} />
      <div className='flex flex-col w-full h-full  overflow-x-scroll bg-slate-50 relative'>
        <Header />
        <div className='mt-16 py-4 px-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SidebarLayout
