import React from 'react'
import CreateProduct from '../../components/view/admin/formCreate/CreateProduct'

const CreateProductPageAdmin = () => {
  return (
    <div className='m-3'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">เพิ่มสินค้า</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">admin</a></li>
                <li className="breadcrumb-item active">product</li>
                <li className="breadcrumb-item active">create</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <CreateProduct />
    </div>
  )
}

export default CreateProductPageAdmin