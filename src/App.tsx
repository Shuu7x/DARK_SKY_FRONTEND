import './configs/theme/styles.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { Router } from './routers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Alert } from './components'
const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <Alert>
            <Router />
          </Alert>
        </QueryClientProvider>
      </ReduxProvider>
    </BrowserRouter>
  )
}

export default App
