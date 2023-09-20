import { IUser } from '@/entities'
import { IViewDialogRef } from '@/interfaces'
import {
  ChangeUserPasswordDialogView,
  CreateUserDialogView,
  EditUserDialogView,
  UserTableView,
} from '@/views'
import React from 'react'

const UserScreen: React.FC = () => {
  const changeUserPasswordDialogRef = React.useRef<IViewDialogRef<Pick<IUser, 'id'>>>(null)
  const createUserDialogRef = React.useRef<IViewDialogRef<void>>(null)
  const editUserDialogRef = React.useRef<IViewDialogRef<Pick<IUser, 'id'>>>(null)

  return (
    <React.Fragment>
      <ChangeUserPasswordDialogView ref={changeUserPasswordDialogRef} />
      <CreateUserDialogView ref={createUserDialogRef} />
      <EditUserDialogView ref={editUserDialogRef} />
      <h1 className='text-2xl font-bold border-b mb-4 pb-2'>Users</h1>
      <UserTableView
        onTriggerChangePassword={(params) => changeUserPasswordDialogRef.current?.open(params)}
        onTriggerCreate={() => createUserDialogRef.current?.open()}
        onTriggerEdit={(params) => editUserDialogRef.current?.open(params)}
      />
    </React.Fragment>
  )
}

export default UserScreen
