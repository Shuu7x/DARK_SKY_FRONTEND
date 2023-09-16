import { Dialog, Input } from '@/components'
import { IDialogRef } from '@/components/dialog'
import { IUser } from '@/entities'
import { IChangeUserPasswordForm, useChangeUserPasswordForm, useUser } from '@/hooks'
import { IViewDialogProps, IViewDialogRef } from '@/interfaces'
import * as Form from '@radix-ui/react-form'
import { useMutation } from '@tanstack/react-query'
import React, { useImperativeHandle } from 'react'
import { Controller } from 'react-hook-form'

type IChangeUserPasswordDialogViewProps = IViewDialogProps

const ChangeUserPasswordDialogView: React.ForwardRefRenderFunction<
  IViewDialogRef<Pick<IUser, 'id'>>,
  IChangeUserPasswordDialogViewProps
> = (_, ref) => {
  // Refs
  const modalRef = React.useRef<IDialogRef>(null)

  // State
  const [userId, setUserId] = React.useState<string>('')

  // Form
  const { control, handleSubmit, reset } = useChangeUserPasswordForm()

  // Redux
  const { changePassword } = useUser()
  const changeUserPasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      modalRef.current?.close()
      reset()
    },
  })

  // Function
  const onSubmitChangeUserPassword = React.useCallback(
    (formValue: IChangeUserPasswordForm) => {
      changeUserPasswordMutation.mutate({ id: userId, password: formValue.password })
    },
    [changeUserPasswordMutation, userId],
  )

  useImperativeHandle(
    ref,
    () => ({
      open(params) {
        setUserId(params.id)
        modalRef.current?.open()
      },
    }),
    [],
  )

  return (
    <Dialog ref={modalRef} title='Change User Password'>
      <Form.Root
        className='w-[500px]'
        onSubmit={handleSubmit(onSubmitChangeUserPassword)}
        autoComplete='off'
      >
        <div className='space-y-2 mb-8'>
          <Controller
            control={control}
            name='password'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>Password</Form.Label>
                  <Form.Control asChild>
                    <Input
                      disabled={changeUserPasswordMutation.isLoading}
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
                    disabled={changeUserPasswordMutation.isLoading}
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
            disabled={changeUserPasswordMutation.isLoading}
            className='flex justify-center w-full px-3 py-2 rounded bg-sky-600 text-white text-center font-bold shadow-sm hover:bg-sky-700 disabled:bg-gray-400'
          >
            Change Password
          </button>
        </Form.Submit>
      </Form.Root>
    </Dialog>
  )
}

export default React.forwardRef(ChangeUserPasswordDialogView)
