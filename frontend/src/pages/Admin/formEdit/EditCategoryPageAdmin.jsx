import React from 'react'
import EditCategory from '../../../components/view/admin/formEdit/EditCategory'
import Categories from '../../../components/view/admin/Categories'

const EditCategoryPageAdmin = () => {
  return (
    <div className='p-3'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">แก้ไขข้อมูล ประเภทสินค้า</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">admin</a></li>
                <li className="breadcrumb-item active">edit</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <EditCategory />
      <Categories />
    </div>
  )
}

export default EditCategoryPageAdmin