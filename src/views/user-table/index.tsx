import { DataTable } from '@/components'
import { getUserTableColumns } from '@/constants'
import { IUser } from '@/entities'
import { useAlert, useUser } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'

interface IUserTableViewProps {
  onTriggerChangePassword(params: Pick<IUser, 'id'>): void
  onTriggerCreate(): void
  onTriggerEdit(params: Pick<IUser, 'id'>): void
}

const UserTableView: React.FC<IUserTableViewProps> = ({
  onTriggerChangePassword,
  onTriggerCreate,
  onTriggerEdit,
}) => {
  // State
  const [globalFilter, setGlobalFilter] = React.useState('')

  // Hooks
  const { onOpen } = useAlert()

  // Redux
  const { list, deleteUser, getUserList } = useUser()
  useQuery({ queryFn: getUserList, queryKey: [] })
  const deleteUserMutation = useMutation({ mutationFn: deleteUser })

  // Functions
  const onTriggerDelete = React.useCallback(
    (params: Pick<IUser, 'id'>) => {
      onOpen({
        title: 'Confirm to delete?',
        description: 'If you want to delete this user, Please press "Confirm" button to confirm.',
        onConfirm: () => deleteUserMutation.mutate(params),
      })
    },
    [onOpen, deleteUserMutation],
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
          Create New User
        </button>
      </div>
      <DataTable
        data={list}
        columns={getUserTableColumns({ onTriggerChangePassword, onTriggerDelete, onTriggerEdit })}
        globalFilter={globalFilter}
      />
    </div>
  )
}

export default UserTableView
