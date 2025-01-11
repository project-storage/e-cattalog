import React, { useEffect, useState } from 'react';
import productService from '../../../service/productService';
import Swal from 'sweetalert2';
import categoriesService from '../../../service/categoriesService';

const Products = () => {
    const [cardData, setCardData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(cardData.length / itemsPerPage);

    const fetchProduct = async () => {
        try {
            const res = await productService.getAllProduct();
            setCardData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await categoriesService.categories();
            setCategories(res.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, []);

    const handleAddCard = async (id, name, type, price) => {
        try {
            const { value: qty } = await Swal.fire({
                title: "จำนวนสินค้า",
                input: "number",
                inputValue: 1,
                showCancelButton: true,
                preConfirm: (value) => {
                    if (!value || value <= 0) {
                        Swal.showValidationMessage('กรุณาใส่จำนวนที่ถูกต้อง');
                    }
                }
            });

            if (qty) {
                let count = 0;
                const existingList = localStorage.getItem('listOrder');
                const listOrder = existingList ? JSON.parse(existingList) : [];
                const PreListOrder = listOrder.map((data) => {
                    if (data.id === id) {
                        const intqty = parseInt(qty, 10);
                        const oldqty = parseInt(data.qty, 10);
                        const totalqty = intqty + oldqty;
                        count++;
                        return { ...data, qty: totalqty };
                    }
                    return data;
                });

                if (count === 0) {
                    PreListOrder.push({ id, price, name, qty, type, discount: 0 });
                }

                localStorage.setItem('listOrder', JSON.stringify(PreListOrder));

                Swal.fire({
                    icon: 'success',
                    title: 'เพิ่มสินค้าสำเร็จ',
                    text: 'สามารถเลือกสินค้าต่อได้เลย',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                icon: "error",
                showConfirmButton: false,
                timer: 1000
            });
        }
    };

    const filteredProducts = selectedCategory
        ? cardData.filter(product => product.category?._id === selectedCategory)
        : cardData;

    // Paginated Products
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="container my-4">
            <div className="row mb-4">
                <div className="col-md-4 offset-md-8">
                    <select
                        className="form-select form-control"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {loading ? (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {paginatedProducts.map((product, index) => (
                        <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={index}>
                            <div className="card shadow-sm h-100">
                                <img
                                    className='card-img-top'
                                    src={`https://e-cattalog-backend.onrender.com/api/product/image/${product._id}`}
                                    alt={product.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className='card-title'>{product.name} {product.description}</h5>
                                    <p className='card-text text-muted'>ประเภทสินค้า: {product.category?.name}</p>
                                    <p className='card-text fw-bold'>฿{product.price}</p>
                                    <button onClick={() => { handleAddCard(product._id, product.name, product.category, product.price) }} className='btn btn-primary mt-auto'>เพิ่มสินค้า</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {filteredProducts.length > itemsPerPage && (
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

export default Products;
