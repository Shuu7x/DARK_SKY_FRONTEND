import { Dialog, Input, Select } from '@/components'
import { IDialogRef } from '@/components/dialog'
import { ICreateDeviceForm, useCreateDeviceForm, useDevice } from '@/hooks'
import { IViewDialogProps, IViewDialogRef } from '@/interfaces'
import * as Form from '@radix-ui/react-form'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Controller } from 'react-hook-form'
type ICreateDeviceDialogViewProps = IViewDialogProps

const CreateDeviceDialogView: React.ForwardRefRenderFunction<
  IViewDialogRef<void>,
  ICreateDeviceDialogViewProps
> = (_, ref) => {
  // Ref
  const modalRef = React.useRef<IDialogRef>(null)

  // Form
  const { control, handleSubmit, reset } = useCreateDeviceForm()

  // Redux
  const { list, createDevice } = useDevice()
  const createDeviceMutation = useMutation({
    mutationFn: createDevice,
    onSuccess: () => {
      modalRef.current?.close()
      reset()
    },
  })

  // Function
  const onCloseDialog = React.useCallback(() => {
    reset()
  }, [reset])

  const onSubmitCreateUser = React.useCallback(
    (formValue: ICreateDeviceForm) => {
      createDeviceMutation.mutate(formValue)
    },
    [createDeviceMutation],
  )

  React.useImperativeHandle(
    ref,
    () => ({
      open() {
        modalRef.current?.open()
      },
    }),
    [],
  )

  console.log('list', list)

  return (
    <Dialog ref={modalRef} title='Create New Device' onClose={onCloseDialog}>
      <Form.Root
        className='w-[500px]'
        onSubmit={handleSubmit(onSubmitCreateUser)}
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
                      disabled={createDeviceMutation.isLoading}
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
                      disabled={createDeviceMutation.isLoading}
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
                      disabled={createDeviceMutation.isLoading}
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
            disabled={createDeviceMutation.isLoading}
          >
            Create New Device
          </button>
        </Form.Submit>
      </Form.Root>
    </Dialog>
  )
}

export default React.forwardRef(CreateDeviceDialogView)
