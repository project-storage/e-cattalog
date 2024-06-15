import React from 'react'
import Categories from '../../components/view/admin/Categories'
import CreateCategory from '../../components/view/admin/formCreate/CreateCategory'

const CategoriesPageAdmin = () => {
  return (
    <div className=' m-3'>
      <CreateCategory />
      <Categories />
    </div>
  )
}

export default CategoriesPageAdmin