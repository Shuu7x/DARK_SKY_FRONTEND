import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

interface ISidebarProps {
  open: boolean
  toggleSidebar(): void
}

const Sidebar: React.FC<ISidebarProps> = ({ open, toggleSidebar }) => {
  return (
    <div
      className={`w-full h-full flex flex-col shadow-md bg-sky-800 z-50 ${
        open ? 'w-64' : 'w-24'
      } border-r`}
    >
      <div className='w-full h-16 flex items-center px-4 relative justify-center border-b border-b-slate-500'>
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
    </div>
  )
}

export default Sidebar
