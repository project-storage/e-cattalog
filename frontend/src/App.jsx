import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './Layout/AdminLayout'
import HomePageAdmin from './pages/Admin/HomePageAdmin'
import HomePageSale from './pages/sale/HomePageSale'
import SaleLayout from './Layout/SaleLayout'
import Login from './pages/auth/Login'
import ProductsPageAdmin from './pages/Admin/ProductsPageAdmin'
import CategoriesPageAdmin from './pages/Admin/CategoriesPageAdmin'
import EditCategoryPageAdmin from './pages/Admin/formEdit/EditCategoryPageAdmin'
import CreateProductPageAdmin from './pages/Admin/CreateProductPageAdmin'
import EditProductPageAdmin from './pages/Admin/formEdit/EditProductPageAdmin'
import ProductPageSale from './pages/sale/ProductPageSale'
import Register from './pages/auth/Register'
import Loading from './components/Loading'
import CustomersPageAdmin from './pages/Admin/CustomersPageAdmin'
import CreateCustomerPageAdmin from './pages/Admin/CreateCustomerPageAdmin'
import CustomerPageSale from './pages/sale/CustomerPageSale'
import CreateCustomerPageSale from './pages/sale/CreateCustomerPageSale'
import Cart from './pages/sale/Cart'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loading' element={<Loading />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<HomePageAdmin />} />
          <Route path='/admin/products' element={<ProductsPageAdmin />} />
          <Route path='/admin/product/create' element={<CreateProductPageAdmin />} />
          <Route path='/admin/product/edit/:id' element={<EditProductPageAdmin />} />
          <Route path='/admin/categories' element={<CategoriesPageAdmin />} />
          <Route path='/admin/category/eidt/:id' element={<EditCategoryPageAdmin />} />
          <Route path='/admin/customers' element={<CustomersPageAdmin />} />
          <Route path='/admin/customer/create' element={<CreateCustomerPageAdmin />} />
        </Route>
        <Route element={<SaleLayout />}>
          <Route path='/sale/dashboard' element={<HomePageSale />} />
          <Route path='/sale/products' element={<ProductPageSale />} />
          <Route path='/sale/customers' element={<CustomerPageSale />} />
          <Route path='/sale/customer/create' element={<CreateCustomerPageSale />} />
          <Route path='sale/cart' element={<Cart/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App