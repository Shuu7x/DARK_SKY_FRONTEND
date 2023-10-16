import { Gauge } from '@/components'
import { withPreload } from '@/configs'
import { IDevice } from '@/entities'
import { IViewDialogRef } from '@/interfaces'
import {
  ChangeLocationDialogView,
  ControlDeviceLogCardView,
  DeviceGridView,
  DeviceStatusDialogView,
  // MasterControlCardView,
  // WeatherCardView,
} from '@/views'
import React from 'react'

const DashBoardScreen: React.FC = () => {
  const changeLocationDialogRef = React.useRef<IViewDialogRef<void>>(null)
  const deviceStatusDialogRef = React.useRef<IViewDialogRef<Pick<IDevice, 'id'>>>(null)
  return (
    <React.Fragment>
      <ChangeLocationDialogView ref={changeLocationDialogRef} />
      <DeviceStatusDialogView ref={deviceStatusDialogRef} />
      <div className='flex flex-col gap-2 '>
        {/* <div className='grid grid-cols-12 space-x-2'>
          <div className=' col-span-8'>
            <WeatherCardView />
          </div>
          <div className='col-span-4'>
            <MasterControlCardView />
          </div>
        </div> */}
        <div className='grid grid-cols-12 space-x-2'>
          <div className='col-span-3'>
            <div className='bg-white shadow-md border rounded-md p-4'>
              <Gauge />
            </div>
          </div>
          <div className='col-span-3'>
            <div className='bg-white shadow-md border rounded-md p-4'>
              <Gauge />
            </div>
          </div>
          <div className='col-span-3'>
            <div className='bg-white shadow-md border rounded-md p-4'>
              <Gauge />
            </div>
          </div>
          <div className='col-span-3'>
            <div className='bg-white shadow-md border rounded-md p-4'>
              <Gauge />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12 space-x-2'>
          <div className='col-span-9'>
            <DeviceGridView
              onExpand={(params) => deviceStatusDialogRef.current?.open({ id: params })}
            />
          </div>
          <div className='col-span-3'>
            <ControlDeviceLogCardView />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withPreload(DashBoardScreen)
