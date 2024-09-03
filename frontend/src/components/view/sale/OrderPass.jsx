import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../../../service/orderService';
import DownloadPDF from './../../sale/DownloadPDF';
import Swal from 'sweetalert2';
import { pdf } from '@react-pdf/renderer';

const OrderPass = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchCustomer, setSearchCustomer] = useState('');
    const [searchSale, setSearchSale] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const res = await orderService.searchPass();
            setOrders(res.data.data);
            setFilteredOrders(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSearch = () => {
        const filtered = orders.filter(order => {
            const matchesCustomer = `${order.customer?.title}${order.customer?.firstName} ${order.customer?.lastName}`.toLowerCase().includes(searchCustomer.toLowerCase());
            const matchesSale = `${order.sale?.title}${order.sale?.firstName} ${order.sale?.lastName}`.toLowerCase().includes(searchSale.toLowerCase());
            return matchesCustomer && matchesSale;
        });
        setFilteredOrders(filtered);
        setCurrentPage(1); // Reset to the first page whenever a new search is made
    };

    const handleDownloadClick = async (order) => {
        const result = await Swal.fire({
            title: 'ยืนยันการดาวน์โหลด?',
            text: "เมื่อกดดาวโหลดสถานะจะเปลี่ยนเป็นส่งให้ลูกค้าแล้ว โปรดทำการส่งใบเสนอราคาให้ลูกค้าหลังจากกดยืนยัน",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน!'
        });

        if (result.isConfirmed) {
            try {
                const doc = <DownloadPDF dataOrder={order} />;
                const asBlob = await pdf(doc).toBlob();

                const projectName = order.project || 'project';
                const estNo = order.estNo || 'estNo';
                const customerName = `${order.customer?.firstName}_${order.customer?.lastName}`;
                const fileName = `${estNo}_${projectName}_${customerName}.pdf`;

                const link = document.createElement('a');
                link.href = URL.createObjectURL(asBlob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);

                await updateStatusOrder(order._id);
            } catch (error) {
                console.error("Error creating or downloading PDF:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error creating or downloading PDF. Please try again later.',
                });
            }
        }
    };

    const updateStatusOrder = async (id) => {
        try {
            await orderService.updateOrder(id, { status: 'toCustomer' });
            Swal.fire({
                icon: 'success',
                title: 'Confirmed!',
                text: 'Order confirmed successfully.',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            navigate('/sale/order/histories');
        } catch (error) {
            console.error("Error updating order status:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error confirming order. Please try again later.',
            });
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchCustomer, searchSale]);

    const handleOrderDetail = (id) => {
        navigate(`/sale/order/list-bil/detail/${id}`);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='tb-orders'>
            <div className="search-bar mb-3">
                <div className="row">
                    <div className="col-md-6">
                        <input type="text"
                            className='form-control mt-1'
                            placeholder='Search name customer'
                            value={searchCustomer}
                            onChange={(e) => setSearchCustomer(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <input type="text"
                            className='form-control mt-1'
                            placeholder='Search name sale'
                            value={searchSale}
                            onChange={(e) => setSearchSale(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-gray table-striped text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">EstNo</th>
                            <th scope="col">ลูกค้า</th>
                            <th scope="col">สถานะ</th>
                            <th scope="col">เซลล์</th>
                            <th scope="col">รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.length > 0 ? (
                            currentOrders.map((order, index) => (
                                <tr key={order.id}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td><p>{order.estNo}</p></td>
                                    <td>{`${order.customer?.title}${order.customer?.firstName} ${order.customer?.lastName}`}</td>
                                    <td><p className='bg-success'>{order.status}</p></td>
                                    <td>{`${order.sale?.title}${order.sale?.firstName} ${order.sale?.lastName}`}</td>
                                    <td>
                                        <button className='btn btn-secondary mt-1 mx-1' onClick={() => handleOrderDetail(order._id)}>ดูรายละเอียดเพิ่มเติม</button>
                                        <button
                                            className='btn btn-success text-light mt-1'
                                            onClick={() => { handleDownloadClick(order) }}
                                        >
                                            ดาวน์โหลดเอกสาร PDF
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">ไม่พบข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {filteredOrders.length > 0 && (
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

export default OrderPass;
