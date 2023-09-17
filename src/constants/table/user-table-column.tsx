import { IUser } from '@/entities'
import { createColumnHelper } from '@tanstack/react-table'
import { MdDelete, MdEdit, MdLock } from 'react-icons/md'

interface IGetUserTableColumnParams {
  onTriggerChangePassword(params: Pick<IUser, 'id'>): void
  onTriggerDelete(params: Pick<IUser, 'id'>): void
  onTriggerEdit(params: Pick<IUser, 'id'>): void
}

const columnHelper = createColumnHelper<Omit<IUser, 'password'>>()

const userRoleTagClassName = {
  ADMIN: 'border-gray-500 bg-gray-50 text-gray-700',
  OWNER: 'border-gray-500 bg-gray-50 text-gray-700',
  USER: 'border-gray-500 bg-gray-50 text-gray-700',
}
const userStatusTagClassName = {
  ACTIVE: 'border-green-500 bg-green-50 text-green-700',
  BANDED: 'border-red-500 bg-red-50 text-red-700',
  INACTIVE: 'border-gray-500 bg-gray-50 text-gray-700',
}

export const getUserTableColumns = ({
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
    cell: (info) => (
      <span
        className={`px-4 py-1 border rounded-md bg font-semibold text-xs flex items-center w-fit ${
          userRoleTagClassName[info.getValue()]
        }`}
      >
        {info.getValue()}
      </span>
    ),
    header: () => <span>Role</span>,
    size: 200,
  }),
  columnHelper.accessor('status', {
    cell: (info) => (
      <span
        className={`px-4 py-1 border rounded-md font-semibold text-xs flex items-center w-fit ${
          userStatusTagClassName[info.getValue()]
        }`}
      >
        {info.getValue()}
      </span>
    ),
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
