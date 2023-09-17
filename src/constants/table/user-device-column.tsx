import { IDevice } from '@/entities'
import { createColumnHelper } from '@tanstack/react-table'
import { MdDelete, MdEdit } from 'react-icons/md'

// interface IGetDeviceTableColumnParams {}

const columnHelper = createColumnHelper<IDevice>()

export const getDeviceTableColumns = () => [
  columnHelper.accessor('no', {
    cell: (info) => <span className='font-medium'>{info.getValue()}</span>,
    header: () => <span>Device No</span>,
    size: 800,
  }),
  columnHelper.accessor('name', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Name</span>,
    size: 200,
  }),
  columnHelper.accessor('location', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Location</span>,
    size: 200,
  }),
  columnHelper.accessor('status', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Status</span>,
    size: 200,
  }),
  columnHelper.accessor('id', {
    cell: () => (
      <div className='flex items-center justify-center w-full gap-x-2'>
        <button className='rounded-full w-8 h-8  flex items-center justify-center border  text-sky-500  bg-sky-50 border-sky-500 hover:bg-sky-200'>
          <MdEdit size={16} />
        </button>
        <button className='rounded-full w-8 h-8 flex items-center justify-center border text-red-500  bg-red-50 border-red-500 hover:bg-red-200'>
          <MdDelete size={16} />
        </button>
      </div>
    ),
    header: () => <span>Action</span>,
    size: 100,
    enableSorting: false,
  }),
]
