/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React, { useCallback, useEffect } from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface IDataTableProps {
  columns: ColumnDef<any, any>[]
  data: any[]
  globalFilter?: any
}

const DataTable: React.FC<IDataTableProps> = ({ data, columns, ...props }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  const propsHandler = useCallback(() => {
    setGlobalFilter(props.globalFilter ?? '')
  }, [props])

  useEffect(propsHandler, [propsHandler])

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  })

  return (
    <div>
      <table className='table-auto w-full border-separate border-spacing-y-2'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className='group text-left p-4 bg-sky-800 text-white first:rounded-s-md last:rounded-e-md'
                  key={header.id}
                >
                  {header.isPlaceholder ? null : (
                    <div className='flex relative w-full items-center justify-between before:absolute before:h-4 before:border-l  before:-left-4 group-first:before:hidden'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <button
                          className='hover:text-sky-200'
                          onClick={() => header.column.toggleSorting()}
                        >
                          {
                            {
                              asc: <FaSortUp size={14} />,
                              desc: <FaSortDown size={14} />,
                              default: <FaSort size={14} />,
                            }[header.column.getIsSorted() || 'default']
                          }
                        </button>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className='group cursor-pointer' key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className='p-4 group-hover:bg-slate-100 bg-white border-slate-300 border-y first:rounded-s-md last:rounded-e-md first:border-l last:border-r'
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex w-full items-center justify-end mt-2 gap-x-2'>
        <div className='font-semibold text-xs pr-2'>
          Page
          <input
            className='w-[70px] h-[24px] focus:ring-0 rounded mx-[8px] text-center text-[14px]'
            min={1}
            max={table.getPageCount()}
            type='number'
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
          {`of ${table.getPageCount()}`}
        </div>

        <button
          className='border w-6 h-6 rounded flex items-center justify-center text-sky-800 border-sky-800 hover:text-sky-500  hover:bg-sky-50 hover:border-sky-500'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <MdChevronLeft />
        </button>
        <button
          className='border w-6 h-6 rounded flex items-center justify-center text-sky-800 border-sky-800 hover:text-sky-500  hover:bg-sky-50 hover:border-sky-500'
          onClick={() => table.previousPage()}
          disabled={!table.getCanNextPage()}
        >
          <MdChevronRight />
        </button>
      </div>
    </div>
  )
}

export default DataTable
