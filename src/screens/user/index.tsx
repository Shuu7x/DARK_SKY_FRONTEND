import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { IUser } from '@/entities'

const columnHelper = createColumnHelper<IUser>()

const columns = [
  columnHelper.accessor('username', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Username</span>,
  }),
  columnHelper.accessor('role', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Role</span>,
  }),
]

const UserScreen: React.FC = () => {
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className='w-full'>
      <table className='w-full'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserScreen
