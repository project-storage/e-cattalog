import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customerService from '../../../service/customerService';
import userService from '../../../service/userService';
import Swal from 'sweetalert2';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSale, setSelectedSale] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await customerService.customerAll();
        setCustomers(res.data.data);
        setFilteredCustomers(res.data.data); // Initialize filteredCustomers with all customers
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchSales = async () => {
      try {
        const res = await userService.userAll();
        setSales(res.data.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchCustomers();
    fetchSales();
  }, []);

  const handleCreate = () => {
    navigate('/admin/customer/create');
  };

  const handleEdit = (id) => {
    navigate(`/admin/customer/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await customerService.deleteCustomer(id)

      const res = await customerService.customerAll()
      setCustomers(res.data.data)
      setFilteredCustomers(res.data.data)

      // Show success alert using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Customer deleted successfully.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      setError("An error occurred while deleting the category.");
    }
  }


  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    filterCustomers(searchTerm, selectedSale);
  };

  const handleSaleFilter = (saleId) => {
    setSelectedSale(saleId);
    filterCustomers(searchTerm, saleId);
  };

  const filterCustomers = (searchTerm, saleId) => {
    let filtered = customers;

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

    // Apply sale filter
    if (saleId !== '') {
      filtered = filtered.filter(customer =>
        customer.sale && customer.sale._id === saleId
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

  return (
    <div className='tb-customers'>
      <div className="search-bar mb-3">
        <div className='row'>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="ค้นหา..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-control mt-1"
              value={selectedSale}
              onChange={(e) => handleSaleFilter(e.target.value)}
            >
              <option value="">ทั้งหมด</option>
              {sales.map(sale => (
                <option key={sale._id} value={sale._id}>{sale.title} {sale.firstName} {sale.lastName}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button className='btn btn-primary mb-3' onClick={handleCreate}>
        เพิ่มข้อมูล
      </button>
      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ชื่อ-นามสกุล</th>
              <th scope="col">อีเมล</th>
              <th scope="col">เบอร์โทร</th>
              <th scope="col">ที่อยู่</th>
              <th scope="col">เซลล์ประจำตัว</th>
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
                  <td>{customer.sale ? `${customer.sale.title} ${customer.sale.firstName} ${customer.sale.lastName}` : '-'}</td>
                  <td>
                    <button className='btn btn-warning mr-1 mt-1' onClick={() => handleEdit(customer._id)}>แก้ไข</button>
                    <button className='btn btn-danger mt-1' onClick={() => handleDelete(customer._id)}>ลบ</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  ไม่พบข้อมูล
                </td>
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
  );
};

export default Customers;
