import { Dialog, LineChart, Slider } from '@/components'
import { IDialogRef } from '@/components/dialog'
import { webSocket } from '@/configs'
import { IDevice } from '@/entities'
import { useControlDeviceLampForm, useDevice } from '@/hooks'
import { IViewDialogProps, IViewDialogRef } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo } from 'react'
import { Controller } from 'react-hook-form'

type IDeviceStatusDialogViewProps = IViewDialogProps

const DeviceStatusDialogView: React.ForwardRefRenderFunction<
  IViewDialogRef<Pick<IDevice, 'id'>>,
  IDeviceStatusDialogViewProps
> = (_, ref) => {
  // Refs
  const dialogRef = React.useRef<IDialogRef>(null)

  // State
  const [deviceId, setDeviceId] = React.useState<string | null>(null)
  const [sensorData, setSensorData] = React.useState<Record<string, any>>({
    CIn: [],
    COut: [],
    LUX: [],
    PIn: [],
    POut: [],
    VIn: [],
    VOut: [],
  })

  // Redux
  const { detail, getDeviceDetail, getDeviceStateList } = useDevice()

  // Form
  const { control, getValues, setValue } = useControlDeviceLampForm()

  // Memos
  const dataChannel = useMemo(() => {
    if (!detail) {
      return null
    }
    return detail.channels?.find((e) => e.topic === `/DATA/${detail.no}`) ?? null
  }, [detail])

  // const lightState = useMemo(() => {
  //   if (!detail) {
  //     return null
  //   }
  //   const defaultState = { ID: detail.no, BRIGHT: 0, TEMP: 0, STATE: 'OFF' }
  //   const currentState =
  //     detail.channels?.find((e) => e.topic === `/LIGHT-STATE/${detail.no}`)?.currentState ?? null

  //   if (!currentState) {
  //     return defaultState
  //   }
  //   return currentState.state ? JSON.parse(currentState.state) : defaultState
  // }, [detail])

  // Queries
  useQuery({
    queryKey: ['devices', deviceId],
    queryFn: ({ queryKey }) => (!queryKey[1] ? null : getDeviceDetail({ id: queryKey[1] })),
  })
  useQuery({
    queryKey: ['device-states', deviceId, dataChannel?.id],
    queryFn: ({ queryKey }) =>
      !queryKey[1] || !queryKey[2]
        ? null
        : getDeviceStateList({ device: queryKey[1], channel: queryKey[2], limit: 500 }),
    onSuccess(data) {
      if (!data) {
        setSensorData({})
        return
      }

      setSensorData(
        data.reduce(
          (acc, cur) => {
            const state = JSON.parse(cur.state)

            acc.CIn.push({ y: state.Cin, x: cur.timestamp })
            acc.COut.push({ y: state.Cout, x: cur.timestamp })
            acc.LUX.push({ y: state.LUX, x: cur.timestamp })
            acc.PIn.push({ y: state.Pin, x: cur.timestamp })
            acc.POut.push({ y: state.Pout, x: cur.timestamp })
            acc.VIn.push({ y: state.Vin, x: cur.timestamp })
            acc.VOut.push({ y: state.Vout, x: cur.timestamp })

            return acc
          },
          { CIn: [], COut: [], LUX: [], PIn: [], POut: [], VIn: [], VOut: [] } as Record<
            string,
            any
          >,
        ),
      )
    },
  })

  // Functions
  const onClose = React.useCallback(() => {
    dialogRef.current?.close()
  }, [])

  const onControlPole = React.useCallback(() => {
    if (!detail) {
      return null
    }
    const formValues = getValues()
    const msg = JSON.stringify({
      topic: `/LIGHT-CTRL/${detail.no}`,
      message: formValues,
    })
    webSocket.client().emit('mqtt', msg)
  }, [detail, getValues])

  // Handlers
  const deviceDetailFetchedHandler = React.useCallback(() => {
    if (!detail) {
      return
    }
    const currentState = detail.channels?.find(
      (e) => e.topic === `/LIGHT-STATE/${detail.no}`,
    )?.currentState

    if (currentState?.state) {
      const state = JSON.parse(currentState.state)

      setValue('BRIGHT', state.BRIGHT ?? '')
      setValue('TEMP', state.TEMP ?? '')
      setValue('STATE', state.STATE ?? '')
    }

    setValue('ID', detail.no ?? '')
  }, [detail, setValue])

  // Effects
  useEffect(deviceDetailFetchedHandler, [deviceDetailFetchedHandler])

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
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4 flex items-center justify-center p-4 border rounded-md'>
            <Controller
              control={control}
              name='STATE'
              render={({ field }) => (
                <button
                  className={`w-36 h-36 rounded-full  text-2xl text-white font-semibold ${
                    field.value === 'ON' ? 'bg-sky-700' : 'bg-gray-400'
                  }`}
                  onClick={() => {
                    field.onChange(field.value === 'ON' ? 'OFF' : 'ON')
                    onControlPole()
                  }}
                >
                  {field?.value}
                </button>
              )}
            />
          </div>
          <div className='col-span-8 flex flex-col items-center justify-center p-4 border rounded-md gap-y-4'>
            <div className='w-full flex flex-col gap-y-2'>
              <Controller
                control={control}
                name='BRIGHT'
                render={({ field }) => (
                  <React.Fragment>
                    <span className='w-full flex justify-between'>
                      <label className='font-semibold'>Brightness</label>
                      <span>{field.value}</span>
                    </span>
                    <Slider
                      min={0}
                      max={100}
                      step={10}
                      value={[field.value]}
                      onValueChange={(v) => {
                        field.onChange(v[0])
                        onControlPole()
                      }}
                    />
                  </React.Fragment>
                )}
              />
            </div>
            <div className='w-full flex flex-col gap-y-2'>
              <Controller
                control={control}
                name='TEMP'
                render={({ field }) => (
                  <React.Fragment>
                    <span className='w-full flex justify-between'>
                      <label className='font-semibold'>Light Temperature</label>
                      <span>{field.value}</span>
                    </span>
                    <Slider
                      min={2500}
                      max={7000}
                      step={500}
                      value={[field.value]}
                      onValueChange={(v) => {
                        field.onChange(v[0])
                        onControlPole()
                      }}
                    />
                  </React.Fragment>
                )}
              />
            </div>
          </div>
          <div className='col-span-6 flex items-center justify-center p-4 border rounded-md'>
            <LineChart title='Power' data={sensorData.PIn} domainY={[0, 50]} stokeColor='red' />
          </div>
          <div className='col-span-6 flex items-center justify-center p-4 border rounded-md'>
            <LineChart title='Voltage' data={sensorData.VIn} domainY={[0, 20]} stokeColor='green' />
          </div>
          <div className='col-span-6 flex items-center justify-center p-4 border rounded-md'>
            <LineChart title='Current' data={sensorData.CIn} domainY={[0, 5]} stokeColor='orange' />
          </div>
          <div className='col-span-6 flex items-center justify-center p-4 border rounded-md'>
            <LineChart
              title='Brightness'
              data={sensorData.LUX}
              domainY={[0, 120000]}
              stokeColor='yellow'
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default React.forwardRef(DeviceStatusDialogView)
