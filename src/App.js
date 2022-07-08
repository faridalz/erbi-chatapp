import React from 'react'
import {AllRoutes} from './components/AllRoutes'
import { AuthProvider } from './context';




export const App = () => {
  return (
      <AuthProvider>
          < AllRoutes />
      </AuthProvider>
  )
}
