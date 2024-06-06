import React from 'react'

const Footer = () => {
    return (
        <div>
            <div>
                {/* /.content-wrapper */}
                <footer className="main-footer">
                    <strong>Copyright © 2024 <a href="https://adminlte.io">me</a>.</strong>
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 0.0.1
                    </div>
                </footer>
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                    <div className="d-flex justify-content-center my-2">
                        <h6>ตะกร้าสินค้า</h6>
                    </div>
                </aside>
            </div>

        </div>
    )
}

export default Footer