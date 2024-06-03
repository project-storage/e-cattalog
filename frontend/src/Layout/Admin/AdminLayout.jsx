import React from 'react'
import Header from '../../components/layouts/Header'
import SideNav from '../../components/layouts/SideNav'
import Footer from '../../components/layouts/Footer'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className='wrapper'>
            <Header />
            <SideNav />
            <Outlet />
            <Footer />
        </div>
    )
}

export default AdminLayout