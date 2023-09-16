import { UserRole, UserStatus, userRole, userStatus } from '@/entities'
import { IOption } from '@/interfaces'

export const USER_ROLE_OPTION: IOption<UserRole>[] = userRole.map((e) => {
  const str = [...e]
  const label = str[0] + str.slice(1, str.length).join('').toLocaleLowerCase()
  return {
    value: e,
    label,
  }
})

export const USER_STATUS_OPTION: IOption<UserStatus>[] = userStatus.map((e) => {
  const str = [...e]
  const label = str[0] + str.slice(1, str.length).join('').toLocaleLowerCase()
  return {
    value: e,
    label,
  }
})
