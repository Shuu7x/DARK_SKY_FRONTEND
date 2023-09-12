import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'
import {
  MdDeviceHub,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdPeople,
  MdSpaceDashboard,
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface ISidebarProps {
  open: boolean
  toggleSidebar(): void
}

const Sidebar: React.FC<ISidebarProps> = ({ open, toggleSidebar }) => {
  const navigate = useNavigate()

  return (
    <div
      className={`w-full h-full flex flex-col shadow-md bg-sky-800 z-50 ${
        open ? 'w-64' : 'w-24'
      } border-r`}
    >
      <div className='w-full h-16 min-h-[4rem] flex items-center px-4 relative justify-center border-b border-b-slate-500'>
        <button className='text-white font-bold text-lg hover:text-sky-200'>
          {open ? 'Dark Sky' : 'DS'}
        </button>
        <button
          className='absolute -right-4 delay-100 rotate-180 rounded-full w-8 h-8 bg-white flex items-center justify-center  ring-white border text-sky-800 border-sky-800 hover:text-sky-500  hover:bg-sky-50 hover:border-sky-500'
          onClick={toggleSidebar}
        >
          {open ? <MdKeyboardArrowRight size={20} /> : <MdKeyboardArrowLeft size={20} />}
        </button>
      </div>
      <NavigationMenu.Root className='h-full my-8'>
        <NavigationMenu.List className='flex flex-col gap-y-2'>
          <NavigationMenu.Item className='px-2'>
            <NavigationMenu.Link
              className={`flex items-center gap-x-2 text-white cursor-pointer hover:text-sky-500 px-4 py-2 ${
                !open ? 'justify-center' : ''
              }`}
              onClick={() => navigate('/dashboard')}
            >
              <MdSpaceDashboard size={24} />
              {open && 'Dashboard'}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item className='px-2'>
            <NavigationMenu.Link
              className={`flex items-center gap-x-2 text-white cursor-pointer hover:text-sky-500 px-4 py-2 ${
                !open ? 'justify-center' : ''
              }`}
              onClick={() => navigate('/devices')}
            >
              <MdDeviceHub size={24} />
              {open && 'Devices'}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item className='px-2'>
            <NavigationMenu.Link
              className={`flex items-center gap-x-2 text-white cursor-pointer hover:text-sky-500 px-4 py-2 ${
                !open ? 'justify-center' : ''
              }`}
              onClick={() => navigate('/users')}
            >
              <MdPeople size={24} />
              {open && 'Users'}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  )
}

export default Sidebar
