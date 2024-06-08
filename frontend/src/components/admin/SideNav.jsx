import React from 'react'

const SideNav = () => {
    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
              
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
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                            <li className="nav-item menu-open">
                                <a href="#" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        หน้าแรก
                                    </p>
                                </a>
                            </li>
                            <li className="nav-header">จัดการระบบ</li>
                            <li className="nav-item">
                                <a href="pages/kanban.html" className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        ใบเสนอราคา
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="pages/kanban.html" className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        สินค้า
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="pages/kanban.html" className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        ประเภทสินค้า
                                    </p>
                                </a>
                            </li>
                            <li className="nav-header">จัดการข้อมูล</li>
                            <li className="nav-item">
                                <a href="pages/kanban.html" className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        ข้อมูลผู้ใช้งาน
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="pages/kanban.html" className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        ข้อมูลส่วนตัว
                                    </p>
                                </a>
                            </li>
                            <li className="nav-header">ออกจากระบบ</li>
                            <li className="nav-item">
                                <a href="../logout.php" className="nav-link">
                                    <i className="nav-icon far fa-circle text-danger" />
                                    <p className="text">ออกจากระบบ</p>
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