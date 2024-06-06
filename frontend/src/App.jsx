import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './Layout/AdminLayout'
import HomePageAdmin from './pages/Admin/HomePageAdmin'
import HomePageSale from './pages/sale/HomePageSale'
import SaleLayout from './Layout/SaleLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path='/' element={<HomePageAdmin />} />
        </Route>
        <Route element={<SaleLayout />}>
          <Route path='/sale' element={<HomePageSale />}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App