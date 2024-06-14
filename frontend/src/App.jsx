import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './Layout/AdminLayout'
import HomePageAdmin from './pages/Admin/HomePageAdmin'
import HomePageSale from './pages/sale/HomePageSale'
import SaleLayout from './Layout/SaleLayout'
import Login from './pages/auth/Login'
import ProductPage from './pages/sale/ProductPage'

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
          <Route path='/sale/product ' element={<ProductPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App