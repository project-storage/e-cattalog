import React from 'react'
import Categories from '../../components/view/admin/Categories'
import CreateCategory from '../../components/view/admin/formCreate/CreateCategory'

const CategoriesPageAdmin = () => {
  return (
    <div className=' m-3'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ประเภทสินค้า</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">admin</a></li>
                <li className="breadcrumb-item active">categories</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <CreateCategory />
      <Categories />
    </div>
  )
}

export default CategoriesPageAdmin