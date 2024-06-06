import React from 'react'
import Header from '../components/sale/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/sale/Footer'
import SideNav from '../components/sale/SideNav'

const SaleLayout = () => {
    return (
        <div className='wrapper'>
            <Header />
            <SideNav />
            <div className="content-wrapper">
                <Outlet />
            </div>     
            <Footer />
        </div>
    )
}

export default SaleLayout