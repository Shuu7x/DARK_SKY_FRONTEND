import React from 'react'

interface IInputProps {
  disabled?: boolean
  error?: boolean
  name?: string
  value?: string | number
  type?: React.HTMLInputTypeAttribute
  onBlur?(): void
  onChange?(): void
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { error, ...props },
  ref,
) => {
  return (
    <input
      className={`rounded disabled:opacity-30 ${
        (!!error && 'border-red-500 focus:ring-red-500 focus:border-red-500') ||
        'focus:ring-sky-600'
      }`}
      {...props}
      ref={ref}
    />
  )
}

export default React.forwardRef(Input)
