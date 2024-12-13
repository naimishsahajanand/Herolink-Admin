import React from 'react'
import "./css/App.scss"
import "./css/SideBar.scss"
import AppRoutes from './Routes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  )
}

export default App