import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SideNav from '../components/admin/SideNav'

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