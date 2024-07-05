import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../../service/userService';
import Swal from 'sweetalert2';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const res = await userService.userAll();
                setSales(res.data.data);
                setFilteredSales(res.data.data); // Initialize filteredSales with all sales
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        };
        fetchSales();
    }, []);

    const handleCreate = () => {
        navigate('/admin/sale/create');
    };

    const handleEdit = (id) => {
        navigate(`/admin/sale/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await userService.deleteUser(id);

            const res = await userService.userAll();
            setSales(res.data.data);
            setFilteredSales(res.data.data);

            // Show success alert using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Sale deleted successfully.',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (error) {
            setError('An error occurred while deleting the sale.');
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        filterSales(searchTerm);
    };

    const filterSales = (searchTerm) => {
        let filtered = sales;

        // Apply search filter
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(sale =>
                sale.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.tel.includes(searchTerm)
            );
        }

        setFilteredSales(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    };

    // Pagination handlers
    const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

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
    const currentSales = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className='tb-sales'>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search sales"
                    value={searchTerm}
                    onChange={handleSearch}
                />
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
                            <th scope="col">สถานะ</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSales.length > 0 ? (
                            currentSales.map((sale, index) => (
                                <tr key={sale._id}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{sale.title} {sale.firstName} {sale.lastName}</td>
                                    <td>{sale.email}</td>
                                    <td>{sale.tel}</td>
                                    <td><p className='bg-success border'>{sale.role}</p></td>
                                    <td>
                                        <button className='btn btn-warning mr-1 mt-1' onClick={() => handleEdit(sale._id)}>แก้ไข</button>
                                        <button className='btn btn-danger mt-1' onClick={() => handleDelete(sale._id)}>ลบ</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">ไม่พบข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {filteredSales.length > 0 && (
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

export default Sales;
