import React from 'react'
import Products from '../../components/view/sale/Products'


const ProductPageSale = () => {
  return (
    <div className='p-3'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">สินค้า</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">sale</a></li>
                <li className="breadcrumb-item active">products</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <div className="row">
        <Products />
      </div>
    </div>
  )
}

export default ProductPageSale