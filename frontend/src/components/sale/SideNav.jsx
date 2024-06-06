import React from 'react'

const SideNav = () => {
    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">AdminLTE 3</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    
                            <li className="nav-item">
                                <a href="pages/product" className="nav-link">
                                    <i className="nav-icon fas fa-clipboard-list" />
                                    <p>
                                        สร้างใบเสนอราคา
                                        {/* <span className="right badge badge-danger">New</span>    */}
                                    </p>
                                </a>
                            </li>  
                            <li className="nav-item">
                                <a href="pages/customer" className="nav-link">
                                    <i className="nav-icon 	fas fa-user-friends" />
                                    <p>
                                        รายชื่อลูกค้า 
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="pages/profile" className="nav-link">
                                    <i className="nav-icon 	fas fa-user-circle" />
                                    <p>
                                        ข้อมูลส่วนตัว
                                    </p>
                                </a>
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