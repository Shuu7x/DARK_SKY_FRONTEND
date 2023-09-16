export type UserRole = 'OWNER' | 'USER' | 'ADMIN'
export type UserStatus = 'BANDED' | 'ACTIVE' | 'INACTIVE'

export const userRole: UserRole[] = ['ADMIN', 'OWNER', 'USER']
export const userStatus: UserStatus[] = ['ACTIVE', 'BANDED', 'INACTIVE']

export interface IUser {
  id: string
  username: string
  password: string
  role: UserRole
  status: UserStatus
}
