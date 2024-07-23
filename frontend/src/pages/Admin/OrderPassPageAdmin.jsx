import React from 'react'
import OrderPass from '../../components/view/admin/OrderPass'

const OrderPassPageAdmin = () => {
    return (
        <div className='p-3'>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">ใบเสนอราคาที่ตรวจสอบแล้ว</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">admin</a></li>
                                <li className="breadcrumb-item active">order</li>
                                <li className="breadcrumb-item active">pass</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <OrderPass />
        </div>
    )
}

export default OrderPassPageAdmin