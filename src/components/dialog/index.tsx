import React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { MdClose } from 'react-icons/md'

export interface IDialogRef {
  open(): void
  close(): void
}

interface IDialogProps {
  ref: React.MutableRefObject<IDialogRef | undefined>
  children: React.ReactNode
  title?: React.ReactNode
  onClose?(): void
}

const Dialog: React.ForwardRefRenderFunction<IDialogRef, IDialogProps> = (
  { children, title, onClose },
  ref,
) => {
  const [open, setOpen] = React.useState(false)

  const dialogClosedHandler = React.useCallback(() => {
    if (open || !onClose) {
      return
    }

    onClose()
  }, [open, onClose])

  React.useEffect(dialogClosedHandler, [dialogClosedHandler])

  React.useImperativeHandle(
    ref,
    () => ({
      open() {
        setOpen(true)
      },
      close() {
        setOpen(false)
      },
    }),
    [],
  )

  return open ? (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='bg-black backdrop-blur-lg opacity-80 fixed inset-0 z-50 w-screen h-screen ' />
        <RadixDialog.Content className='bg-white shadow-md z-50 focus:outline-none rounded-md min-w-[300px] fixed top-14 left-[50%] translate-x-[-50%]'>
          <div className='flex w-full justify-between items-center h-14 relative border-b px-4'>
            <RadixDialog.Title asChild>
              <span className='font-bold'>{title}</span>
            </RadixDialog.Title>
            <RadixDialog.Close asChild>
              <button className='w-8 h-8 rounded-full flex items-center justify-center absolute right-2 hover:bg-slate-100'>
                <MdClose />
              </button>
            </RadixDialog.Close>
          </div>
          <div className='p-4 w-full'>{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  ) : (
    <React.Fragment />
  )
}

export default React.forwardRef(Dialog)
