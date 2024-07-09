import React, { useEffect, useState } from 'react';
import orderService from '../../../../service/orderService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const MasterDataOrder = () => {
    const [orderInfo, setOrderInfo] = useState(null);
    const [error, setError] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await orderService.orderById(id);
                if (res.status === 200) {
                    setOrderInfo(res.data.data);
                    setFilteredOrders(res.data.data.products); // Assuming products need to be paginated
                    setLoading(false);
                } else {
                    setError('Error fetching order data');
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching order:", error);
                setError('Error fetching order data');
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredOrders.length / itemsPerPage)));
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const uniqueCategories = [...new Set(filteredOrders.map(product => product.product.category.name))];

    const filteredProducts = selectedCategory
        ? filteredOrders.filter(product => product.product.category.name === selectedCategory)
        : filteredOrders;

    // Calculate the displayed categories
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleConfirmOrder = async (id) => {
        try {
            await orderService.updateOrder(id, { status: 'pass' });
            Swal.fire({
                icon: 'success',
                title: 'Confirmed!',
                text: 'Order confirmed successfully.',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            navigate('/admin/order/process');
        } catch (error) {
            console.error("Error updating order status:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error confirming order. Please try again later.',
            });
        }
    };

    const handleFailOrder = async (id) => {
        try {
            await orderService.updateOrder(id, { status: 'fail', comment });
            Swal.fire({
                icon: 'success',
                title: 'Failed!',
                text: 'Order marked as failed successfully.',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            navigate('/admin/order/process');
        } catch (error) {
            console.error("Error updating order status:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error marking order as failed. Please try again later.',
            });
        }
    };

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>ข้อมูลลูกค้า</h3>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputTitleCustomer"
                                        placeholder="title"
                                        value={orderInfo?.customer?.title || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputFirstNameCustomer"
                                        placeholder="firstName"
                                        value={orderInfo?.customer?.firstName || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputLastNameCustomer"
                                        placeholder="lastName"
                                        value={orderInfo?.customer?.lastName || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputTelCustomer"
                                        placeholder="tel"
                                        value={orderInfo?.customer?.tel || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputEmailCustomer"
                                        placeholder="email"
                                        value={orderInfo?.customer?.email || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="inputAddressCustomer"
                                        placeholder="address"
                                        value={orderInfo?.customer?.address || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h3>ข้อมูลเซลล์</h3>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputTitleSale"
                                        placeholder="title"
                                        value={orderInfo?.sale?.title || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputFirstNameSale"
                                        placeholder="firstName"
                                        value={orderInfo?.sale?.firstName || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputLastNameSale"
                                        placeholder="lastName"
                                        value={orderInfo?.sale?.lastName || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputTelSale"
                                        placeholder="tel"
                                        value={orderInfo?.sale?.tel || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputEmailSale"
                                        placeholder="email"
                                        value={orderInfo?.sale?.email || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <select
                                className="form-control"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">All Categories</option>
                                {uniqueCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mt-1">
                            <p className='border bg-warning rounded text-center w-25 h-75'>{orderInfo?.status}</p>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-gray table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ชื่อสินค้า</th>
                                    <th scope="col">ประเภทสินค้า</th>
                                    <th scope="col">รายละเอียด</th>
                                    <th scope="col">จำนวน</th>
                                    <th scope="col">ราคา / ส่วนลด</th>
                                    <th scope="col">ราคารวม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((product, index) => (
                                    <tr key={product.product._id}>
                                        <td>{index + 1 + indexOfFirstItem}</td>
                                        <td>{product.product.name}</td>
                                        <td>{product.product.category.name}</td>
                                        <td>{product.product.description}</td>
                                        <td>{product.qty}</td>
                                        <td>{product.product.price} ฿ / {product.discount} %</td>
                                        <td>{product.finalPrice} ฿</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredProducts.length > 0 && (
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-start">
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
                    <div className="row">
                        <div className="col-md-8">
                            <textarea
                                type="text"
                                name="comment"
                                id="inputComment"
                                style={{ width: "100%" }}
                                value={comment}
                                placeholder='เสนอความคิดเห็นเมื่อเสนอราคาผิดพลาด'
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <button className='btn btn-danger  mr-2' onClick={() => handleFailOrder(orderInfo._id)}>ออร์เดอร์ผิดพลาด</button>
                            <button className='btn btn-success ' onClick={() => handleConfirmOrder(orderInfo._id)}>ยืนยันออร์เดอร์</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MasterDataOrder;
