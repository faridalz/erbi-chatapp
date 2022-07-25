import React from 'react'
import {AllRoutes} from './components/AllRoutes'
import { AuthProvider } from './context';
import './App.css';



export const App = () => {
  return (
      <AuthProvider>
          < AllRoutes />
      </AuthProvider>
  )
}
