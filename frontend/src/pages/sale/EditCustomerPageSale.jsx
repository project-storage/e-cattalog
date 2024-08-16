import React from 'react'
import EditCustomer from '../../components/view/sale/formEdit/EditCustomer'

const EditCustomerPageSale = () => {
    return (
        <div className='p-3'>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">แก้ไขข้อมูลลูกค้า</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">sale</a></li>
                                <li className="breadcrumb-item active">cutomer</li>
                                <li className="breadcrumb-item active">eidt</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <EditCustomer />
        </div>
    )
}

export default EditCustomerPageSale