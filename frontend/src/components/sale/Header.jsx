import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Header = () => {
    const [count, setCount] = useState('')
    const navigate = useNavigate()

    const handleLogout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'แน่ใจแล้วหรอที่จะออกจากระบบ',
            showCancelButton: true,
            confirmButtonText: 'กดเพื่อออกจากระบบ',
            cancelButtonText: 'กดยกเลิกยังไม่แน่ใจ'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                Swal.fire({
                    icon: 'success',
                    title: 'ออกจากระบบสำเร็จ',
                    text: 'แล้วเจอกันใหม่สวัสดี',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                navigate('/')
            }
        })
    }

    useEffect(() => {
        const dataCart = JSON.parse(localStorage.getItem("listOrder"))
        if (dataCart) {
            const count = dataCart.length;
            setCount(count)
        } else {
            setCount(0)
        }

    }, [])
    return (
        <div>
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li class="nav-item d-none d-sm-inline-block">
                        <a href="index.php" class="nav-link">ระบบจัดทำใบเสนอราคา</a>
                    </li>
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto mr-5">
                    {/* Notifications Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <div className="btn-group">
                            <button type="button" className="btn border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-cog" />   ตั้งค่า
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <button className="dropdown-item" type="button"> <i className='fas fa-user-circle' /> ข้อมูลส่วนตัว</button>
                                <button className="dropdown-item" type="button" onClick={handleLogout} > <i className='far fa-circle text-danger' /> ออกจากระบบ</button>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link me-4" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                            <i className="fas fa-shopping-cart" />
                            <span className="badge badge-danger navbar-badge pb-1">{count}</span>
                        </a>
                    </li>

                </ul>
            </nav>
            {/* /.navbar */}

        </div>
    )
}

export default Header