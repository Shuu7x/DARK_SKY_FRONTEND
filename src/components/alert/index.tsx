import * as AlertDialog from '@radix-ui/react-alert-dialog'
import React, { ReactNode, useCallback, useMemo } from 'react'

type DIALOG_TYPE = 'CONFIRM' | 'ALERT'

export interface IAlertOption {
  title?: string
  description?: string
  type?: DIALOG_TYPE
  onConfirm?(): void | Promise<void>
  onCancel?(): void | Promise<void>
  submitText?: string
  cancelText?: string
}

export interface IAlertContext {
  onOpen(params: IAlertOption): void
}

export interface IAlertProps {
  children?: ReactNode
}

export const AlertContext = React.createContext({
  onOpen: (_params: IAlertOption) => {
    throw new Error('Method not implement.')
  },
} as IAlertContext)

const defaultOptions: IAlertOption = {
  title: '',
  description: '',
  type: 'CONFIRM',
  onConfirm: undefined,
  onCancel: undefined,
  submitText: undefined,
  cancelText: undefined,
}

const Alert: React.FC<IAlertProps> = ({ children }) => {
  // State
  const [option, setOption] = React.useState<IAlertOption>(defaultOptions)
  const [open, setOpen] = React.useState(false)

  // Function
  const onOpen = useCallback((params: IAlertOption) => {
    setOption(params)
    setOpen(true)
  }, [])

  const closeAlertHandler = React.useCallback(() => {
    if (open) {
      return
    }

    setOption(defaultOptions)
  }, [open])

  React.useEffect(closeAlertHandler, [closeAlertHandler])

  return (
    <AlertContext.Provider value={useMemo(() => ({ onOpen }), [onOpen])}>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className='bg-black backdrop-blur-lg opacity-80 fixed inset-0 z-50 w-screen h-screen ' />
          <AlertDialog.Content className='bg-white shadow-md z-50 focus:outline-none rounded-md min-w-[350px] max-w-[500px] fixed top-14 left-[50%] translate-x-[-50%]'>
            <div className='flex w-full justify-between items-center h-14 relative border-b px-4'>
              <AlertDialog.Title className='font-semibold'>{option?.title ?? ''}</AlertDialog.Title>
            </div>
            <AlertDialog.Description className='p-4 min-h-[100px] text-gray-500'>
              {option?.description ?? ''}
            </AlertDialog.Description>

            <div className='flex justify-end gap-2 p-2'>
              <AlertDialog.Action asChild>
                <button
                  className='flex justify-center px-3 py-1.5 rounded bg-sky-600 text-white text-center font-semibold hover:bg-sky-700 disabled:bg-gray-400'
                  onClick={option?.onConfirm}
                >
                  {option?.submitText ?? 'Confirm'}
                </button>
              </AlertDialog.Action>
              {(option?.type ?? 'CONFIRM') === 'CONFIRM' && (
                <AlertDialog.Cancel asChild>
                  <button
                    className='flex justify-center px-3 py-1.5 rounded border border-sky-600 text-sky-600 text-center font-semibold hover:bg-sky-100 disabled:bg-gray-400'
                    onClick={option?.onCancel}
                  >
                    {option?.cancelText ?? 'Cancel'}
                  </button>
                </AlertDialog.Cancel>
              )}
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      {children}
    </AlertContext.Provider>
  )
}

export default Alert
