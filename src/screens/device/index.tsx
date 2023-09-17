import { IDevice } from '@/entities'
import { IViewDialogRef } from '@/interfaces'
import { CreateDeviceDialogView, DeviceTableView, EditDeviceDialogView } from '@/views'
import React from 'react'

const DeviceScreen: React.FC = () => {
  const createDeviceDialogRef = React.useRef<IViewDialogRef<void>>(null)
  const editDeviceDialogRef = React.useRef<IViewDialogRef<Pick<IDevice, 'id'>>>(null)
  return (
    <React.Fragment>
      <CreateDeviceDialogView ref={createDeviceDialogRef} />
      <EditDeviceDialogView ref={editDeviceDialogRef} />
      <h1 className='text-2xl font-bold border-b mb-4 pb-2'>Devices</h1>
      <DeviceTableView
        onTriggerCreate={() => createDeviceDialogRef.current?.open()}
        onTriggerEdit={(params) => editDeviceDialogRef.current?.open(params)}
      />
    </React.Fragment>
  )
}

export default DeviceScreen
