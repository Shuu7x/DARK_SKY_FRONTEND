import { AlertContext } from '@/components/alert'
import { useContext } from 'react'

export const useAlert = () => {
  return useContext(AlertContext)
}
