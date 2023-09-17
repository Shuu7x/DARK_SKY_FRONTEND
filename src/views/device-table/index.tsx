import { DataTable } from '@/components'
import { getDeviceTableColumns } from '@/constants'
import { IUser } from '@/entities'
import { useAlert, useDevice } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'

interface IDeviceTableViewProps {
  onTriggerCreate(): void
}

const DeviceTableView: React.FC<IDeviceTableViewProps> = ({ onTriggerCreate }) => {
  // State
  const [globalFilter, setGlobalFilter] = React.useState('')

  // Redux
  const { list, deleteDevice, getDeviceList } = useDevice()
  useQuery({ queryFn: getDeviceList, queryKey: [] })
  const deleteDeviceMutation = useMutation({ mutationFn: deleteDevice })

  // Hooks
  const { onOpen } = useAlert()

  // Functions
  const onTriggerDelete = React.useCallback(
    (params: Pick<IUser, 'id'>) => {
      onOpen({
        title: 'Confirm to delete?',
        description: 'If you want to delete this device, Please press "Confirm" button to confirm.',
        onConfirm: () => deleteDeviceMutation.mutate(params),
      })
    },
    [onOpen, deleteDeviceMutation],
  )

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-2'>
        <div>
          <input
            type='search'
            className='h-10 w-72 rounded-md'
            placeholder='ค้นหา....'
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <button
          className='flex justify-center px-4 py-2 rounded bg-sky-800 text-white text-center font-bold shadow-sm hover:bg-sky-900 disabled:bg-gray-400'
          onClick={onTriggerCreate}
        >
          Create New Device
        </button>
      </div>
      <DataTable data={list} columns={getDeviceTableColumns({onTriggerDelete})} globalFilter={globalFilter} />
    </div>
  )
}

export default DeviceTableView
