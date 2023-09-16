/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginForm, useAuth, useLoginForm } from '@/hooks'
import * as Form from '@radix-ui/react-form'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Controller } from 'react-hook-form'

const LoginFormView: React.FC = () => {
  // form
  const { control, handleSubmit, setError } = useLoginForm()

  // redux
  const { signInWithUsername } = useAuth()
  // const notification = useNotification()

  const signInWithUsernameMutation = useMutation({
    mutationFn: signInWithUsername,
    onError: (e: any) => {
      setError('username', e)
    },
  })

  const onSubmitLogin = React.useCallback(
    (formValue: ILoginForm) => {
      signInWithUsernameMutation.mutate(formValue)
    },
    [signInWithUsernameMutation],
  )

  return (
    <Form.Root className='w-full' onSubmit={handleSubmit(onSubmitLogin)}>
      <div className='space-y-2 mb-8'>
        <Controller
          control={control}
          name='username'
          render={({ field, fieldState }) => (
            <Form.Field name={field.name}>
              <div className='flex flex-col'>
                <Form.Label className='font-bold mb-1'>Username</Form.Label>
                <Form.Control
                  className={`rounded disabled:opacity-30 ${
                    (!!fieldState.error &&
                      'border-red-500 focus:ring-red-500 focus:border-red-500') ||
                    'focus:ring-sky-600'
                  }`}
                  {...field}
                  disabled={signInWithUsernameMutation.isLoading}
                />
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
                <Form.Control
                  type='password'
                  className={`rounded disabled:opacity-30 ${
                    (!!fieldState.error &&
                      'border-red-500 focus:ring-red-500 focus:border-red-500') ||
                    'focus:ring-sky-600'
                  }`}
                  {...field}
                  disabled={signInWithUsernameMutation.isLoading}
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
          disabled={signInWithUsernameMutation.isLoading}
        >
          Sign In
        </button>
      </Form.Submit>
    </Form.Root>
  )
}

export default LoginFormView
