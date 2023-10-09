import { Dialog } from '@/components'
import { IDialogRef } from '@/components/dialog'
import { IViewDialogProps, IViewDialogRef } from '@/interfaces'
import React from 'react'

type IChangeLocationDialogViewProps = IViewDialogProps

const ChangeLocationDialogView: React.ForwardRefRenderFunction<
  IViewDialogRef<void>,
  IChangeLocationDialogViewProps
> = (_, ref) => {
  // Refs
  const dialogRef = React.useRef<IDialogRef>(null)

  // Functions
  const onClose = React.useCallback(() => {
    dialogRef.current?.close()
  }, [])

  React.useImperativeHandle(
    ref,
    () => ({
      open() {
        dialogRef.current?.open()
      },
    }),
    [],
  )
  return (
    <Dialog onClose={onClose} ref={dialogRef} title='Change location'>
      ChangeLocationDialogView
    </Dialog>
  )
}

export default React.forwardRef(ChangeLocationDialogView)
