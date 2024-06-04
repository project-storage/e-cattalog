import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './Layout/AdminLayout'
import HomePageAdmin from './pages/admin/HomePageAdmin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path='/' element={<HomePageAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App