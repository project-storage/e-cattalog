import React from 'react'
import CreateCustomerBySale from '../../components/view/sale/formCreate/CreateCustomerBySale'

const CreateCustomerPageSale = () => {
    return (
        <div className='p-3'>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">เพิ่มข้อมูลลูกค้า</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">sale</a></li>
                                <li className="breadcrumb-item active">customers</li>
                                <li className="breadcrumb-item active">create</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <CreateCustomerBySale />
        </div>
    )
}

export default CreateCustomerPageSale