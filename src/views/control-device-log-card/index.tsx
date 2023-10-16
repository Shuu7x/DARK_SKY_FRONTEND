import { IDevice } from '@/entities'
import { useDevice } from '@/hooks'
import { dayJs } from '@/libs'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { MdDeviceThermostat, MdSunny } from 'react-icons/md'

const ControlDeviceLogCardView: React.FC = () => {
  const { getDeviceStateList } = useDevice()

  const controlLogQuery = useQuery({
    queryKey: ['device-control-logs'],
    queryFn: () => getDeviceStateList({ topic: 'LIGHT-STATE', limit: 10 }),
  })

  return (
    <div className='bg-white shadow-md border rounded-md'>
      <h3 className='font-bold text-lg p-4 pb-3 border-b border-b-slate-400'>Pole Control Log</h3>
      <div className='flex flex-col max-h-[500px] overflow-y-scroll px-4'>
        {controlLogQuery.data?.map((item) => {
          const state = JSON.parse(item?.state)
          return (
            <div key={item.id} className='border-b py-4 flex justify-between'>
              <div className='flex flex-col'>
                <span className='font-semibold'>{(item.device as IDevice).name}</span>
                <span className='font-light text-gray-400 text-xs'>
                  {(item.device as IDevice).no}
                </span>
                <span className='font-light text-gray-400 text-xs mt-4'>
                  {`${dayJs(item.timestamp).format('DD MMM YYYY HH:mm:ss')}, ${dayJs(
                    item.timestamp,
                  ).fromNow()}`}
                </span>
              </div>
              <div className='flex flex-col items-end justify-between'>
                <span
                  className={`font-semibold ${
                    state.STATE === 'ON' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {state.STATE}
                </span>
                <div className='flex gap-x-2'>
                  <span className='flex font-light text-gray-400 text-xs items-center justify-between gap-x-1 text-yellow-600 '>
                    <MdSunny size={14} />
                    {state.BRIGHT}
                  </span>
                  <span className='flex font-light text-gray-400 text-xs items-center justify-between gap-x-1  text-blue-600'>
                    <MdDeviceThermostat size={14} />
                    {state.TEMP}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ControlDeviceLogCardView
