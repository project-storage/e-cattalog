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
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto mr-5">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt" />
                            
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link me-4" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                            <i className="fas fa-shopping-cart" />
                            <span className="badge badge-danger navbar-badge pb-1">3</span>
                        </a>
                    </li>
                </ul>
            </nav>
            {/* /.navbar */}

        </div>
    )
}

export default Header