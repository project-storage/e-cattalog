import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import AdminLayout from './Layout/AdminLayout'
import DashboardAdmin from './pages/Admin/DashboardAdmin'
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
import EditCustomerPageAdmin from './pages/Admin/formEdit/EditCustomerPageAdmin'
import SalesPageAdmin from './pages/Admin/SalesPageAdmin'
import CreateSalePageAdmin from './pages/Admin/CreateSalePageAdmin'
import EditSalePageAdmin from './pages/Admin/formEdit/EditSalePageAdmin'
import OrderProcessPageAdmin from './pages/Admin/OrderProcessPageAdmin'
import ProfileAdmin from './pages/Admin/ProfileAdmin'

import OrderPass from './pages/sale/OrderPassPageSale'
import OrderPassPageAdmin from './pages/Admin/OrderPassPageAdmin'
import MasterOrderProcessPageAdmin from './pages/Admin/masterTablePage/MasterOrderProcessPageAdmin'
import MasterOrderPassPageAdmin from './pages/Admin/masterTablePage/MasterOrderPassPageAdmin'
import MasterOrderFailPageAdmin from './pages/Admin/masterTablePage/MasterOrderFailPageAdmin'
import OrderFailPageAdmin from './pages/Admin/OrderFailPageAdmin'
import Pdf from './components/sale/Pdf'
import HistoryOrderPageSale from './pages/sale/HistoryOrderPageSale';
import MasterDataOrderHistoryPageSale from './pages/sale/MasterDataPage/MasterDataOrderHistoryPageSale'
import MasterDataOrderPassPageSale from './pages/sale/MasterDataPage/MasterDataOrderPassPageSale'
import OrderFailPageSale from './pages/sale/OrderFailPageSale'
import MasterDataOrderFailPageSale from './pages/sale/MasterDataPage/MasterDataOrderFailPageSale'
import ProfileSale from './pages/sale/ProfileSale'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loading' element={<Loading />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<DashboardAdmin />} />
          <Route path='/admin/products' element={<ProductsPageAdmin />} />
          <Route path='/admin/product/create' element={<CreateProductPageAdmin />} />
          <Route path='/admin/product/edit/:id' element={<EditProductPageAdmin />} />
          <Route path='/admin/categories' element={<CategoriesPageAdmin />} />
          <Route path='/admin/category/eidt/:id' element={<EditCategoryPageAdmin />} />
          <Route path='/admin/customers' element={<CustomersPageAdmin />} />
          <Route path='/admin/customer/create' element={<CreateCustomerPageAdmin />} />
          <Route path='/admin/customer/edit/:id' element={<EditCustomerPageAdmin />} />
          <Route path='/admin/sales' element={<SalesPageAdmin />} />
          <Route path='/admin/sale/create' element={<CreateSalePageAdmin />} />
          <Route path='/admin/sale/edit/:id' element={<EditSalePageAdmin />} />
          <Route path='/admin/order/process' element={<OrderProcessPageAdmin />} />
          <Route path='/admin/order/process/detail/:id' element={<MasterOrderProcessPageAdmin />} />
          <Route path='/admin/order/pass' element={<OrderPassPageAdmin />} />
          <Route path='/admin/order/pass/detail/:id' element={<MasterOrderPassPageAdmin />} />
          <Route path='/admin/order/fail' element={<OrderFailPageAdmin />} />
          <Route path='/admin/order/fail/detail/:id' element={<MasterOrderFailPageAdmin />} />
          <Route path='/admin/profile' element={<ProfileAdmin />} />
        </Route>
        <Route element={<SaleLayout />}>
          <Route path='/sale/dashboard' element={<HomePageSale />} />
          <Route path='/sale/products' element={<ProductPageSale />} />
          <Route path='/sale/customers' element={<CustomerPageSale />} />
          <Route path='/sale/customer/create' element={<CreateCustomerPageSale />} />
          <Route path='/sale/cart' element={<Cart />} />
          <Route path='/sale/order/list-bils' element={<OrderPass />} />
          <Route path='/sale/order/list-bil/detail/:id' element={<MasterDataOrderPassPageSale />} />
          <Route path='/sale/order/histories' element={<HistoryOrderPageSale />} />
          <Route path='/sale/order/history/detail/:id' element={<MasterDataOrderHistoryPageSale />} />
          <Route path='/sale/order/fail' element={<OrderFailPageSale />} />
          <Route path='/sale/order/fail/detail/:id' element={<MasterDataOrderFailPageSale />} />
          <Route path='/sale/profile' element={<ProfileSale />} />
        </Route>
        <Route path='/sale/order/create-pdf/:id' element={<Pdf />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App