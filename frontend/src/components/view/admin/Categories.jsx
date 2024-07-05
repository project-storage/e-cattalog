import React, { useState, useEffect } from 'react';
import categoriesService from '../../../service/categoriesService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoriesService.categories();
        setCategories(res.data.data);
        setFilteredCategories(res.data.data); // Initialize filteredCategories
      } catch (error) {
        setError("An error occurred while fetching categories.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter categories based on search term
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1); // Reset to the first page when search term changes
  }, [searchTerm, categories]);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredCategories.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEidt = async (id) => {
    navigate(`/admin/category/eidt/${id}`)
  }
  const handleDelete = async (id) => {
    try {
      // Perform deletion
      await categoriesService.deleteCategory(id);

      // Refetch data after deletion
      const res = await categoriesService.categories();
      setCategories(res.data.data);
      setFilteredCategories(res.data.data);

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
  };

  // Calculate the displayed categories
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className='tb-categories'>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search categories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ประเภทสินค้า</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category, index) => (
                <tr key={category.id}>
                  <th scope="row">{indexOfFirstItem + index + 1}</th>
                  <td>{category.name}</td>
                  <td>
                    <button className='btn btn-warning mr-1' onClick={() => handleEidt(category._id)}>Edit</button>
                    <button className='btn btn-danger ' onClick={() => handleDelete(category._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
      {filteredCategories.length > 0 && (
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

export default Categories;
