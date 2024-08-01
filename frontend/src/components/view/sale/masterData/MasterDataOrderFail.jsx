import React, { useEffect, useState } from 'react';

import orderService from '../../../../service/orderService';
import { useNavigate, useParams } from 'react-router-dom';


import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'

const MasterDataOrderFail = () => {
    const [orderInfo, setOrderInfo] = useState(null);
    const [error, setError] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [temp, setTemp] = useState([]);
    const [modal, setModal] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => setOpen(false);

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
        console.log(temp)
    }, [temp])

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

    useEffect(() => {
        const Premodal = []
        const Pre = []
        var log = ""
        if (Pre.length == 0) {
            currentOrders.forEach((data) => {
                if (data.product.category._id !== log) {

                    Pre.push({ ...data.product.category, discount: data.discount });
                    Premodal.push(
                        <div className="" key={data.product.category._id}>
                            <p>{data.product.category.name}</p>
                            <input
                                type='number'
                                className='form-control my-2'
                                defaultValue={data.discount}
                                onChange={(e) => { setDiscount(e.target.value, data.product.category._id) }}
                            />
                        </div>
                    )
                    log = data.product.category._id;  // Update the log variable
                }
            });
        }

        setTemp(Pre);
        setModal(Premodal);
    }, [orderInfo])


    const setDiscount = (value, id) => {
        const PreTemp = temp.map((data) => {
            console.log(data._id, " == ", id)
            if (data._id == id) {
                return { ...data, discount: parseInt(value) };
            }
            return data;
        });
        console.log(PreTemp)
        setTemp(PreTemp);  // Update the state
    }

    const handleSubmitChangeOrder = async () => {
        const body = orderInfo
        console.log('Before change:', body)
        console.log(temp)

        body.products.map((dataBody) => {
            temp.map((dataTemp) => {
                if (dataBody.product.category._id == dataTemp._id) {
                    dataBody.discount = dataTemp.discount // เปลี่ยนค่า discount
                }
            })
        })

        console.log('After change:', body.products)
        const reqBody = {
            "products":  body.products,
            "status":"process"
        }
        
        console.log(reqBody)

        const res = await orderService.updateOrder(id,reqBody)
        if(res.status == 200){
            handleClose()
            Swal.fire({
                title:"ส่งแก้ไขเสร็จสิ้น",
                icon:"success",
                showConfirmButton:false,
                timer:1000,
                timerProgressBar:true
            }).then(()=> {
                navigate('/sale/order/fail')
            })
        }else{
            Swal.fire({
                title:"เกิดข้อผิดพลาด",
                icon:"error",
                showConfirmButton:false,
                timer:1000
            })
        }
    }


    const uniqueCategories = [...new Set(filteredOrders.map(product => product.product.category.name))];

    const filteredProducts = selectedCategory
        ? filteredOrders.filter(product => product.product.category.name === selectedCategory)
        : filteredOrders;

    // Calculate the displayed categories
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
                        <div className="col-md-3 mt-2">
                            <p className=' text-center '>
                                status :
                                <span className='badge badge-pill badge-danger p-2 '>{orderInfo?.status}</span>
                            </p>
                        </div>
                        <div className="col-md-3 mt-2">
                            <p className=' text-center'>
                                Project Name :
                                <span className='badge badge-pill badge-secondary p-2 '>{orderInfo?.project}</span>
                            </p>
                        </div>
                    </div>

                    <div className="table-responsive">
                    <button onClick={() => { handleOpen() }} className='my-2 text-light btn btn-danger  form-control'>แก้ไขส่วนลด</button>
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
                    <p>ราคารวมทั้งหมด : {orderInfo.totalPrice} ฿</p>
                    <div className="row">
                        <div className="col-md-12">
                            <textarea
                                type="text"
                                name="comment"
                                id="inputComment"
                                style={{ width: "100%" }}
                                value={orderInfo.comment}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Modal
                                className='mt-4'
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <div className="container my-3">
                                    <div className="row justify-content-center">
                                        <div className=" col-md-7 rounded py-3  bg-light ">
                                            <div className="d-flex justify-content-end">
                                                <Button className='text-dark' onClick={() => { handleClose() }}>X</Button>
                                            </div>
                                            <div className="px-4 pb-5">
                                                {modal}

                                                <button className='btn btn-success form-control' onClick={() => { handleSubmitChangeOrder() }}>ยืนยัน</button>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </Modal>
                        </div>


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
                </div>
            </div>
        </div>
    );
};

export default MasterDataOrderFail;
