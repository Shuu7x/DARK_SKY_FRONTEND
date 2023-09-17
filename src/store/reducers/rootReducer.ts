import { authReducer } from './auth'
import { deviceReducer } from './device'
import { userReducer } from './user'

export const rootReducer = {
  auth: authReducer,
  device: deviceReducer,
  user: userReducer,
}
