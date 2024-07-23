import React from 'react'
import OrderProcess from '../../components/view/admin/OrderProcess'

const OrderProcessPageAdmin = () => {
  return (
    <div className='p-3'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ใบเสนอราคาที่ยังไม่ได้ตรวจสอบ</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">admin</a></li>
                <li className="breadcrumb-item active">order</li>
                <li className="breadcrumb-item active">process</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <OrderProcess />
    </div>
  )
}

export default OrderProcessPageAdmin