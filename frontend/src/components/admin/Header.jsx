import React from 'react'

const Header = () => {
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
                <ul className="navbar-nav ml-auto">
                    {/* Notifications Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <div className="btn-group">
                            <button type="button" className="btn border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-cog" />   ตั้งค่า
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <button className="dropdown-item" type="button"> <i className='fas fa-user-circle' /> ข้อมูลส่วนตัว</button>
                                <button className="dropdown-item" type="button"> <i className='far fa-circle text-danger' /> ออกจากระบบ</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            {/* /.navbar */}

        </div>
    )
}

export default Header