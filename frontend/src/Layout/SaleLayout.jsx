import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import SideNav from '../components/sale/SideNav'

const SaleLayout = () => {
    return (
        <div className='wrapper'>
            <Header />
            <SideNav />
            <Outlet />
            <Footer />
        </div>
    )
}

export default SaleLayout