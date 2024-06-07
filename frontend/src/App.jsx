import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './Layout/AdminLayout'
import HomePageAdmin from './pages/Admin/HomePageAdmin'
import HomePageSale from './pages/sale/HomePageSale'
import SaleLayout from './Layout/SaleLayout'
import Login from './pages/auth/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<HomePageAdmin />} />
        </Route>
        <Route element={<SaleLayout />}>
          <Route path='/sale' element={<HomePageSale />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App