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
                <aside className="control-sidebar control-sidebar-dark " style={{ width: "30%" }}>
                    <div className="d-flex align-items-center flex-column h-100">
                        <div className=" my-2">รายการสินค้า</div>
                    
                        <ListFooter />

                        
                            <button className='  my-2 btn btn-warning mt-auto form-control'>ยืนยัน</button>

                    </div>
                </aside>
            </div>

        </div>
    )
}

export default Footer