import { withPreload } from '@/configs'
import { DeviceGridView, MasterControlCardView, WeatherCardView } from '@/views'
import React from 'react'

const DashBoardScreen: React.FC = () => {
  return (
    <React.Fragment>
      <div className='grid grid-cols-12 space-x-2'>
        <div className=' col-span-8'>
          <WeatherCardView />
        </div>
        <div className='col-span-4'>
          <MasterControlCardView />
        </div>
      </div>
      <div className='grid grid-cols-12 space-x-2'>
        <div className='col-span-4'>Gauge</div>
        <div className='col-span-4'>Gauge</div>
        <div className='col-span-4'>Gauge</div>
        <div className='col-span-4'>Gauge</div>
      </div>
      <div className='grid grid-cols-12 space-x-2'>
        <div className='col-span-9'>
          <DeviceGridView />
        </div>
        <div className='col-span-3'>Controller log</div>
      </div>
    </React.Fragment>
  )
}

export default withPreload(DashBoardScreen)
