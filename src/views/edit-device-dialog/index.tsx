import { Dialog } from '@/components'
import { IDialogRef } from '@/components/dialog'
import Input from '@/components/input'
import Select from '@/components/select'
import { IDevice } from '@/entities'
import { IEditDeviceForm, useDevice, useEditDeviceForm } from '@/hooks'
import { IViewDialogProps, IViewDialogRef } from '@/interfaces'
import * as Form from '@radix-ui/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Controller } from 'react-hook-form'

type IEditUserDialogProps = IViewDialogProps

const EditDeviceDialogView: React.ForwardRefRenderFunction<
  IViewDialogRef<Pick<IDevice, 'id'>>,
  IEditUserDialogProps
> = (_, ref) => {
  // Ref
  const modalRef = React.useRef<IDialogRef>(null)

  // State
  const [deviceId, setDeviceId] = React.useState<string | null>(null)

  // Forms
  const { control, handleSubmit, reset, setValue } = useEditDeviceForm()

  // Redux
  const { detail, list, cancelGetDeviceDetail, editDevice, getDeviceDetail } = useDevice()
  const getDeviceDetailQuery = useQuery({
    queryKey: ['devices', deviceId],
    queryFn: ({ queryKey }) => (!queryKey[1] ? null : getDeviceDetail({ id: queryKey[1] })),
  })
  const editDeviceMutation = useMutation({
    mutationFn: editDevice,
    onSuccess: () => {
      modalRef.current?.close()
      reset()
    },
  })

  // Functions
  const onCloseDialog = React.useCallback(() => {
    cancelGetDeviceDetail()
    setDeviceId(null)
    reset()
  }, [cancelGetDeviceDetail, reset])

  const onSubmitEditDevice = React.useCallback(
    ({ no, ...formValue }: IEditDeviceForm) => {
      if (!detail) {
        return
      }
      editDeviceMutation.mutate({ id: detail?.id, ...formValue, meta: detail?.meta })
    },
    [editDeviceMutation, detail],
  )

  // Handlers
  const onUserDetailFetchedHandler = React.useCallback(() => {
    if (!detail) {
      return
    }

    setValue('no', detail.no ?? '')
    setValue('name', detail.name ?? '')
    setValue('location', detail.location ?? '')
    setValue('master', detail.master ?? '')
  }, [detail, setValue])

  // Effects
  React.useEffect(onUserDetailFetchedHandler, [onUserDetailFetchedHandler])

  React.useImperativeHandle(
    ref,
    () => ({
      open(params) {
        setDeviceId(params.id as string)
        modalRef.current?.open()
      },
    }),
    [],
  )
  return (
    <Dialog ref={modalRef} title='Edit Device' onClose={onCloseDialog}>
      <Form.Root
        className='w-[500px]'
        onSubmit={handleSubmit(onSubmitEditDevice)}
        autoComplete='off'
      >
        <div className='space-y-2 mb-8'>
          <Controller
            control={control}
            name='no'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>Device no</Form.Label>
                  <Form.Control asChild>
                    <Input
                      disabled
                      error={!!fieldState.error}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </Form.Control>
                </div>
                {fieldState.error && (
                  <Form.Message className='text-red-500'>{fieldState.error.message}</Form.Message>
                )}
              </Form.Field>
            )}
          />
          <Controller
            control={control}
            name='name'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>Device name</Form.Label>
                  <Form.Control asChild>
                    <Input
                      disabled={editDeviceMutation.isLoading || getDeviceDetailQuery.isLoading}
                      error={!!fieldState.error}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </Form.Control>
                </div>
                {fieldState.error && (
                  <Form.Message className='text-red-500'>{fieldState.error.message}</Form.Message>
                )}
              </Form.Field>
            )}
          />
          <Controller
            control={control}
            name='location'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>
                    Location
                    <span className='text-gray-400 text-sm font-light ml-1'>(Optional)</span>
                  </Form.Label>
                  <Form.Control asChild>
                    <Input
                      disabled={editDeviceMutation.isLoading || getDeviceDetailQuery.isLoading}
                      error={!!fieldState.error}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </Form.Control>
                </div>
                {fieldState.error && (
                  <Form.Message className='text-red-500'>{fieldState.error.message}</Form.Message>
                )}
              </Form.Field>
            )}
          />
          <Controller
            control={control}
            name='master'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>
                    Master device
                    <span className='text-gray-400 text-sm font-light ml-1'>(Optional)</span>
                  </Form.Label>
                  <Form.Control asChild>
                    <Select
                      {...field}
                      value={field.value ?? ''}
                      option={list
                        .filter((e) => !e.master)
                        .map((e) => ({ label: e.no, value: e.id }))}
                      placeholder='Please select one'
                    />
                  </Form.Control>
                </div>
                {!!fieldState.error && (
                  <Form.Message className='text-red-500'>{fieldState.error.message}</Form.Message>
                )}
              </Form.Field>
            )}
          />
        </div>
        <Form.Submit asChild>
          <button
            className='flex justify-center w-full px-3 py-2 rounded bg-sky-600 text-white text-center font-bold shadow-sm hover:bg-sky-700 disabled:bg-gray-400'
            disabled={editDeviceMutation.isLoading || getDeviceDetailQuery.isLoading}
          >
            Create New Device
          </button>
        </Form.Submit>
      </Form.Root>
    </Dialog>
  )
}

export default React.forwardRef(EditDeviceDialogView)
