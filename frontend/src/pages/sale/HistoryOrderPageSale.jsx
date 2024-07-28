import React from 'react'
import HistoryOrder from '../../components/view/sale/HistoryOrder'

const HistoryOrderPageSale = () => {
  return (
    <div className='p-3'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ประวัติใบเสนอราคา</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">sale</a></li>
                <li className="breadcrumb-item active">order</li>
                <li className="breadcrumb-item active">histories</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <HistoryOrder />
    </div>
  )
}

export default HistoryOrderPageSale