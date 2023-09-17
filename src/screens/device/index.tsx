import { IViewDialogRef } from '@/interfaces'
import { CreateDeviceDialogView, DeviceTableView } from '@/views'
import React from 'react'

const DeviceScreen: React.FC = () => {
  const createDeviceDialogRef = React.useRef<IViewDialogRef<void>>(null)
  return (
    <React.Fragment>
      <CreateDeviceDialogView ref={createDeviceDialogRef} />
      <h1 className='text-2xl font-bold border-b mb-4 pb-2'>Devices</h1>
      <DeviceTableView onTriggerCreate={() => createDeviceDialogRef.current?.open()} />
    </React.Fragment>
  )
}

export default DeviceScreen
