import { Dialog, Select } from '@/components'
import { IDialogRef } from '@/components/dialog'
import Input from '@/components/input'
import { USER_ROLE_OPTION, USER_STATUS_OPTION } from '@/constants'
import { IEditUserForm, useEditUserForm, useUser } from '@/hooks'
import { IViewDialogProps, IViewDialogRef } from '@/interfaces'
import * as Form from '@radix-ui/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Controller } from 'react-hook-form'

type IEditUserDialogProps = IViewDialogProps

const EditUserDialogView: React.ForwardRefRenderFunction<IViewDialogRef, IEditUserDialogProps> = (
  _,
  ref,
) => {
  // Ref
  const modalRef = React.useRef<IDialogRef>(null)

  // State
  const [userId, setUserId] = React.useState<string | null>(null)

  // Form
  const { control, handleSubmit, setValue, reset } = useEditUserForm()

  // Redux
  const { detail, cancelGetUserDetail, editUser, getUserDetail } = useUser()
  const getUserDetailQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: ({ queryKey }) => (!queryKey[1] ? null : getUserDetail({ id: queryKey[1] })),
  })
  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      modalRef.current?.close()
      reset()
    },
  })

  // Functions
  const onCloseDialog = React.useCallback(() => {
    cancelGetUserDetail()
    setUserId('')
    reset()
  }, [cancelGetUserDetail, reset])

  const onSubmitEditUser = React.useCallback(
    ({ username, ...formValue }: IEditUserForm) => {
      if (!userId) {
        return
      }
      editUserMutation.mutate({ id: userId, ...formValue })
    },
    [editUserMutation, userId],
  )

  // Handlers
  const onUserDetailFetchedHandler = React.useCallback(() => {
    if (!detail) {
      return
    }

    setValue('username', detail.username)
    setValue('status', detail.status)
    setValue('role', detail.role)
  }, [detail, setValue])

  // Effects
  React.useEffect(onUserDetailFetchedHandler, [onUserDetailFetchedHandler])

  React.useImperativeHandle(
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
    <Dialog ref={modalRef} title='Edit user' onClose={onCloseDialog}>
      <Form.Root className='w-[500px]' onSubmit={handleSubmit(onSubmitEditUser)} autoComplete='off'>
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
                      error={!!fieldState.error}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabled={true}
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
                      disabled={getUserDetailQuery.isLoading || editUserMutation.isLoading}
                      option={USER_ROLE_OPTION}
                      placeholder='Please select one'
                      value={field.value}
                      onChange={field.onChange}
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
            name='status'
            render={({ field, fieldState }) => (
              <Form.Field name={field.name}>
                <div className='flex flex-col'>
                  <Form.Label className='font-bold mb-1'>Status</Form.Label>
                  <Form.Control asChild>
                    <Select
                      disabled={getUserDetailQuery.isLoading || editUserMutation.isLoading}
                      {...field}
                      option={USER_STATUS_OPTION}
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
            disabled={getUserDetailQuery.isLoading || editUserMutation.isLoading}
          >
            Save
          </button>
        </Form.Submit>
      </Form.Root>
    </Dialog>
  )
}

export default React.forwardRef(EditUserDialogView)
