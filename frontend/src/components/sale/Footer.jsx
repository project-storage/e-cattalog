import React from 'react'
import ListFooter from './ListFooter'

const Footer = () => {
    return (
        <div>
            <div>
                {/* /.content-wrapper */}
                <footer className="main-footer">
                    <strong>Copyright © 2024</strong>
                    <span> All rights reserved.</span>
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 3.2.0
                    </div>
                </footer>
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark ">
                    <div className="d-flex justify-content-center my-auto">รายการสินค้า</div>
                        <div className="d-flex justify-content-center">
                             <ListFooter  />
                        </div>
                </aside>
            </div>

        </div>
    )
}

export default Footer