import './configs/theme/styles.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Alert } from './components'
import { WebSocketProvider } from './configs'
import { Router } from './routers'
import { store } from './store'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <WebSocketProvider>
            <Alert>
              <Router />
            </Alert>
          </WebSocketProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </BrowserRouter>
  )
}

export default App
