import { DataTable } from '@/components'
import { IUser } from '@/entities'
import { useAlert, useUser } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { MdDelete, MdEdit, MdLock } from 'react-icons/md'

interface IUserTableViewProps {
  onTriggerChangePassword(params: Pick<IUser, 'id'>): void
  onTriggerCreate(): void
  onTriggerEdit(params: Pick<IUser, 'id'>): void
}

interface IGetUserTableColumnParams {
  onTriggerChangePassword(params: Pick<IUser, 'id'>): void
  onTriggerDelete(params: Pick<IUser, 'id'>): void
  onTriggerEdit(params: Pick<IUser, 'id'>): void
}

const columnHelper = createColumnHelper<Omit<IUser, 'password'>>()

const getColumns = ({
  onTriggerChangePassword,
  onTriggerDelete,
  onTriggerEdit,
}: IGetUserTableColumnParams) => [
  columnHelper.accessor('username', {
    cell: (info) => <span className='font-medium'>{info.getValue()}</span>,
    header: () => <span>Username</span>,
    size: 800,
  }),
  columnHelper.accessor('role', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Role</span>,
    size: 200,
  }),
  columnHelper.accessor('status', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Status</span>,
    size: 200,
  }),
  columnHelper.accessor('id', {
    cell: (info) => (
      <div className='flex items-center justify-center w-full gap-x-2'>
        <button
          className='rounded-full w-8 h-8  flex items-center justify-center border  text-sky-500  bg-sky-50 border-sky-500 hover:bg-sky-200'
          onClick={() => onTriggerEdit({ id: info.getValue() })}
        >
          <MdEdit size={16} />
        </button>
        <button
          className='rounded-full w-8 h-8  flex items-center justify-center border  text-yellow-500  bg-yellow-50 border-yellow-500 hover:bg-yellow-200'
          onClick={() => onTriggerChangePassword({ id: info.getValue() })}
        >
          <MdLock size={16} />
        </button>
        <button
          className='rounded-full w-8 h-8 flex items-center justify-center border text-red-500  bg-red-50 border-red-500 hover:bg-red-200'
          onClick={() => onTriggerDelete({ id: info.getValue() })}
        >
          <MdDelete size={16} />
        </button>
      </div>
    ),
    header: () => <span>Action</span>,
    size: 100,
    enableSorting: false,
  }),
]

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
        columns={getColumns({ onTriggerChangePassword, onTriggerDelete, onTriggerEdit })}
        globalFilter={globalFilter}
      />
    </div>
  )
}

export default UserTableView
