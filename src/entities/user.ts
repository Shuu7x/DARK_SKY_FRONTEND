export type UserRole = 'OWNER' | 'USER'

export interface IUser {
  id: string
  username: string
  password: string
  role: UserRole
}
