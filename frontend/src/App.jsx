import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './Layout/AdminLayout'
import HomePageAdmin from './pages/Admin/HomePageAdmin'
import HomePageSale from './pages/sale/HomePageSale'
import SaleLayout from './Layout/SaleLayout'
import Login from './pages/auth/Login'
import ProductPage from './pages/sale/ProductPage'
import ProductsPageAdmin from './pages/Admin/ProductsPageAdmin'
import CategoriesPageAdmin from './pages/Admin/CategoriesPageAdmin'
import EditCategoryPageAdmin from './pages/Admin/formEdit/EditCategoryPageAdmin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<HomePageAdmin />} />
          <Route path='/admin/products' element={<ProductsPageAdmin/>}/>
          <Route path='/admin/categories' element={<CategoriesPageAdmin/>}/>
          <Route path='/admin/category/eidt/:id' element={<EditCategoryPageAdmin/>}/>
        </Route>
        <Route element={<SaleLayout />}>
          <Route path='/sale' element={<HomePageSale />}/>
          <Route path='/sale/product/' element={<ProductPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App