import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import customerService from '../../../service/customerService'

const Customers = () => {
  const [customerBySaleId, setCustomerBySaleId] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleCreate = () => {
    navigate('/sale/customer/create')
  }

  const fetchData = async () => {
    try {
      const res = await customerService.customerBysaleId()
      setCustomerBySaleId(res.data.data)
      setFilteredCustomers(res.data.data);
    } catch (error) {
      setError("Failed to fetch customer data.")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    filterCustomers(searchTerm);
  };

  const filterCustomers = (searchTerm, saleId) => {
    let filtered = customerBySaleId;

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(customer =>
        customer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.tel.includes(searchTerm)
      );
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Pagination handlers
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  // Placeholder functions for edit and delete
  const handleEdit = (customerId) => {
    // Handle edit logic
    navigate(`/sale/customer/edit/${customerId}`);
  };

  return (
    <div className='tb-customers'>
      <div className="search-bar mb-3">
        <div className='row'>
          <div className="col-sm-10 mt-1">
            <input
              type="text"
              className="form-control"
              placeholder="ค้นหา..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-sm-2 mt-1">
            <button className='btn btn-primary' onClick={handleCreate}>เพิ่มข้อมูล</button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ชื่อ-นามสกุล</th>
              <th scope="col">อีเมล</th>
              <th scope="col">เบอร์โทร</th>
              <th scope="col">ที่อยู่</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer, index) => (
                <tr key={customer._id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{customer.title} {customer.firstName} {customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.tel}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button className='btn btn-warning mr-1 mt-1' onClick={() => handleEdit(customer._id)}>แก้ไข</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredCustomers.length > 0 && (
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

export default Customers
