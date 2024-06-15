import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const SideNav = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">

                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                            <li className="nav-item menu-open">
                                <NavLink to='/admin/dashboard' className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        หน้าแรก
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-header">จัดการระบบ</li>
                            <li className="nav-item">
                                <NavLink to='/admin/orders' className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        ใบเสนอราคา
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/products' className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        สินค้า
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/categories' className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        ประเภทสินค้า
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-header">จัดการข้อมูล</li>
                            <li className="nav-item">
                                <NavLink to='/admin/customers' className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        ข้อมูลลูกค้า
                                    </p>
                                </NavLink>
                                <NavLink to='/admin/users' className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        ข้อมูลผู้ใช้งาน
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/profile' className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        ข้อมูลส่วนตัว
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-header">ออกจากระบบ</li>
                            <li className="nav-item">
                                <NavLink onClick={handleLogout} className="nav-link">
                                    <i className="nav-icon far fa-circle text-danger" />
                                    <p className="text">ออกจากระบบ</p>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>

        </div>
    )
}

export default SideNav