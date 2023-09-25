import { useDevice } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { MdMoreHoriz } from 'react-icons/md'

const DeviceGridView: React.FC = () => {
  const { list, getDeviceList } = useDevice()
  useQuery({ queryFn: getDeviceList, queryKey: [] })

  return (
    <div className='bg-white shadow-md border rounded-md p-4'>
      <h3 className=' font-bold text-lg pb-3 mb-4 border-b'>Device List</h3>
      <div className='grid grid-cols-12 gap-4'>
        {list.map((item) => (
          <div className='col-span-4' key={`device-grid-card-${item.id}`}>
            <div className='flex flex-col relative justify-between shadow-sm border border-slate-400 rounded-md p-4 h-32'>
              <button className='absolute top-3 right-3 rounded-full w-8 h-8  flex items-center justify-center border  text-sky-500  bg-sky-50 border-sky-500 hover:bg-sky-200'>
                <MdMoreHoriz />
              </button>
              <div className=''>
                <div className='font-semibold'>{item.name}</div>
                <div className='font-light text-gray-400 text-sm'>{item.location}</div>
              </div>
              <div className='flex justify-between items-end'>
                <span className='font-light text-gray-400 text-sm'>{item.no}</span>
                <span className='font-semibold'>ON</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeviceGridView
