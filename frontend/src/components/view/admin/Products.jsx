import React, { useEffect, useState } from 'react'
import productService from '../../../service/productService'
import { useNavigate } from 'react-router-dom'
import categoriesService from '../../../service/categoriesService'
import Swal from 'sweetalert2'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchCategory, setSearchCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate()

  const fetchProducts = async () => {
    const res = await productService.getAllProduct()
    setProducts(res.data.data)
    setFilteredProducts(res.data.data)
  }

  const fetchCategories = async () => {
    const res = await categoriesService.categories()
    setCategories(res.data.data)
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const handleCreateForm = () => {
    navigate('/admin/product/create')
  }

  const handleEdit = (id) => {
    navigate(`/admin/product/edit/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id)

      const res = await productService.getAllProduct()
      setProducts(res.data.data)
      setFilteredProducts(res.data.data)

      // Show success alert using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Category deleted successfully.',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      setError("An error occurred while deleting the category.");
    }
  }

  const handleSearch = () => {
    const filtered = products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase())
      const matchesCategory = searchCategory ? product.category?.name === searchCategory : true
      return matchesName && matchesCategory
    })
    setFilteredProducts(filtered)
  }

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredProducts.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the displayed categories
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    handleSearch()
    setCurrentPage(1)
  }, [searchName, searchCategory, products])

  return (
    <div className=' tb-products'>
      <div className='search-bar mb-3'>
        <div className="row">
          <div className="col-md-6">
            <input
              type='text'
              className='form-control mt-1'
              placeholder='Search by product name'
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select className='form-control mt-1' value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
              <option value=''>All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button className='btn btn-primary mb-3' onClick={handleCreateForm}>เพิ่มข้อมูล</button>

      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">ประเภทสินค้า</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <img src={`http://localhost:8080/api/product/image/${product._id}`} alt={product.name} className="product-image" style={{ width: '50px', height: '50px' }} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category?.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price} ฿</td>
                  <td>
                    <button className='btn btn-warning mr-1 mt-1' onClick={() => handleEdit(product._id)}>แก้ไข</button>
                    <button className='btn btn-danger mt-1' onClick={() => handleDelete(product._id)}>ลบ</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredProducts.length > 0 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePreviousPage}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handleNextPage}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

export default Products
