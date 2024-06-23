import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import userService from '../../service/userService'

const SideNav = () => {
    const [userInfo, setUserInfo] = useState([])
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await userService.userInfo()
            setUserInfo(res.data.data)
        }
        fetchData()
    }, [])
    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">

                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    {userInfo ? (
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="info">
                                <h5 className="d-block bg-dark">{userInfo.title}{userInfo.firstName} {userInfo.lastName}</h5>
                                <p className="d-block text-center bg-dark">สถานะ: <span className='bg-success p-1'>{userInfo.role}</span></p>
                            </div>
                        </div>
                    ) : null}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                            <li className="nav-item ">
                                <NavLink to='/admin/dashboard' className="nav-link">
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