import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/admin/Header'
import Footer from '../components/Footer'
import SideNav from '../components/admin/SideNav'

const AdminLayout = () => {
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

export default AdminLayout