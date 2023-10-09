import { Dialog, Gauge, LineChart } from '@/components'
import { IDialogRef } from '@/components/dialog'
import { IDevice } from '@/entities'
import { useDevice } from '@/hooks'
import { IViewDialogProps, IViewDialogRef } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type IDeviceStatusDialogViewProps = IViewDialogProps

const DeviceStatusDialogView: React.ForwardRefRenderFunction<
  IViewDialogRef<Pick<IDevice, 'id'>>,
  IDeviceStatusDialogViewProps
> = (_, ref) => {
  // Refs
  const dialogRef = React.useRef<IDialogRef>(null)

  // State
  const [deviceId, setDeviceId] = React.useState<string | null>(null)
  // Redux
  const { getDeviceDetail } = useDevice()
  useQuery({
    queryKey: ['devices', deviceId],
    queryFn: ({ queryKey }) => (!queryKey[1] ? null : getDeviceDetail({ id: queryKey[1] })),
  })

  const onClose = React.useCallback(() => {
    dialogRef.current?.close()
  }, [])

  React.useImperativeHandle(
    ref,
    () => ({
      open({ id }) {
        setDeviceId(id as string)
        dialogRef.current?.open()
      },
    }),
    [],
  )

  return (
    <Dialog onClose={onClose} ref={dialogRef} title='Device status'>
      <div className='w-[800px]'>
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-4 flex items-center justify-center p-2'>
            <button className=' w-36 h-36 rounded-full bg-sky-700 text-2xl text-white font-semibold'>
              ON
            </button>
          </div>
          <div className='col-span-4 flex items-center justify-center p-2'>
            <Gauge />
          </div>
          <div className='col-span-4 flex items-center justify-center p-2'>
            <Gauge />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-2 mt-2'>
          <div className='col-span-6 flex items-center justify-center p-2'>
            {/* <span className='w-full pb-4 border-b font-semibold'>Temperature</span> */}
            <LineChart title='Temperature' data={[]} />
          </div>
          <div className='col-span-6 flex items-center justify-center p-2'>
            {/* <span className='w-full pb-4 border-b font-semibold'>Temperature</span> */}
            <LineChart title='Temperature' data={[]} />
          </div>
          <div className='col-span-6 flex items-center justify-center p-2'>
            {/* <span className='w-full pb-4 border-b font-semibold'>Temperature</span> */}
            <LineChart title='Temperature' data={[]} />
          </div>
          <div className='col-span-6 flex items-center justify-center p-2'>
            {/* <span className='w-full pb-4 border-b font-semibold'>Temperature</span> */}
            <LineChart title='Temperature' data={[]} />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default React.forwardRef(DeviceStatusDialogView)
