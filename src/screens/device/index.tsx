import { DeviceTableView } from '@/views'
import React from 'react'

const DeviceScreen: React.FC = () => {
  return (
    <React.Fragment>
      <DeviceTableView onTriggerCreate={() => console.log('first')} />
    </React.Fragment>
  )
}

export default DeviceScreen
