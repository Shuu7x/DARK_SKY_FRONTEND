/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Input, Select } from '@/components'
import { IDialogRef } from '@/components/dialog'
import { USER_ROLE_OPTION } from '@/constants'
import { ICreateUserForm, useCreateUserForm, useUser } from '@/hooks'
import { IViewDialogProps, IViewDialogRef } from '@/interfaces'
import * as Form from '@radix-ui/react-form'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Controller } from 'react-hook-form'

type ICreateUserDialogViewProps = IViewDialogProps

const CreateUserDialogView: React.ForwardRefRenderFunction<
  IViewDialogRef<void>,
  ICreateUserDialogViewProps
> = (_, ref) => {
  // Refs
  const modalRef = React.useRef<IDialogRef>(null)

  // Form
  const { control, handleSubmit, reset } = useCreateUserForm()

  // Redux
  const { createUser } = useUser()
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      modalRef.current?.close()
      reset()
    },
  })

  // Functions
  const onCloseDialog = React.useCallback(() => {
    reset()
  }, [reset])

  const onSubmitCreateUser = React.useCallback(
    ({ confirmPassword, ...formValue }: ICreateUserForm) => {
      createUserMutation.mutate(formValue)
    },
    [createUserMutation],
  )

  React.useImperativeHandle(
    ref,
    () => ({
      open() {
        modalRef?.current?.open()
      },
    }),
    [],
  )
  return (
    <Dialog ref={modalRef} title='Create New User' onClose={onCloseDialog}>
      <Form.Root
        className='w-[500px]'
        onSubmit={handleSubmit(onSubmitCreateUser)}
        autoComplete='off'
      >
        <div className='space-y-2 mb-8'>
          <Controller
            control={control}
            name='username'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>Username</Form.Label>
                  <Form.Control asChild>
                    <Input
                      disabled={createUserMutation.isLoading}
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
            name='role'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>Role</Form.Label>
                  <Form.Control asChild>
                    <Select
                      disabled={createUserMutation.isLoading}
                      {...field}
                      option={USER_ROLE_OPTION}
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
          <Controller
            control={control}
            name='password'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>Password</Form.Label>
                  <Form.Control asChild>
                    <Input
                      disabled={createUserMutation.isLoading}
                      {...field}
                      type='password'
                      error={!!fieldState.error}
                    />
                  </Form.Control>
                </div>
                {!!fieldState.error && (
                  <Form.Message className='text-red-500'>{fieldState.error.message}</Form.Message>
                )}
              </Form.Field>
            )}
          />
          <Controller
            control={control}
            name='confirmPassword'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>Confirm password</Form.Label>
                  <Input
                    disabled={createUserMutation.isLoading}
                    {...field}
                    type='password'
                    error={!!fieldState.error}
                  />
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
            disabled={createUserMutation.isLoading}
          >
            Create New User
          </button>
        </Form.Submit>
      </Form.Root>
    </Dialog>
  )
}

export default React.forwardRef(CreateUserDialogView)
