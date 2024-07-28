import React from 'react'
import OrderFail from '../../components/view/sale/OrderFail'

const OrderFailPageSale = () => {
    return (
        <div className='p-3'>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">ใบเสนอราคาที่ต้องแก้ไข</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">sale</a></li>
                                <li className="breadcrumb-item active">order</li>
                                <li className="breadcrumb-item active">fail</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <OrderFail />
        </div>
    )
}

export default OrderFailPageSale