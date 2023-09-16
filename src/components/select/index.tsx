/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOption } from '@/interfaces'
import * as RadixSelect from '@radix-ui/react-select'
import React from 'react'
import { MdCheck, MdExpandMore } from 'react-icons/md'

interface ISelectProps {
  disabled?: boolean
  error?: boolean
  name?: string
  option: IOption<any>[]
  placeholder?: string
  value?: string | undefined
  onChange?(...event: any[]): void
}

const Select: React.ForwardRefRenderFunction<HTMLButtonElement, ISelectProps> = (
  { error = false, option, placeholder, value, ...props },
  ref,
) => {
  return (
    <RadixSelect.Root onValueChange={props.onChange}>
      <RadixSelect.Trigger
        className={`flex px-3 relative items-center border border-gray-600 h-10 ${
          value ? 'text-black' : 'text-gray-400'
        } rounded disabled:opacity-30 ${
          (!!error && 'border-red-500 focus:ring-red-500 focus:border-red-500') ||
          'focus:ring-sky-600'
        }`}
        ref={ref}
        value={value}
      >
        <RadixSelect.Value asChild>
          <span>{option.find((e) => e.value === value)?.label ?? placeholder}</span>
        </RadixSelect.Value>
        <RadixSelect.Icon className='text-black absolute right-3'>
          <MdExpandMore />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal className='bg-white p-1 z-50 shadow-md border overflow-hidden rounded-md translate-x-0'>
        <RadixSelect.Content className='self-center w-full relative'>
          <RadixSelect.Viewport>
            {option.map((e) => (
              <RadixSelect.SelectItem
                className='h-10 flex items-center px-2 justify-between cursor-pointer hover:text-sky-400 hover:bg-sky-100 rounded'
                key={e.value}
                value={e.value}
              >
                <RadixSelect.ItemText>{e.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <MdCheck />
                </RadixSelect.ItemIndicator>
              </RadixSelect.SelectItem>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

export default React.forwardRef(Select)
