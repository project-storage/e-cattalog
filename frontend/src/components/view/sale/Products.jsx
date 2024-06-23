import React, { useEffect, useState } from 'react'
import productService from '../../../service/productService';
import Swal from 'sweetalert2';

const Products = () => {
    const [cardData, setCardData] = useState([])

    const handleAddCard = async (id, productName) => {
        try {
            const { value: qty } = await Swal.fire({
                title: "จำนวนสินค้า",
                input: "number",
                inputValue: 1,
                showCancelButton: true,
                preConfirm: (value) => {
                    if (!value || value <= 0) {
                        Swal.showValidationMessage('กรุณาใส่จำนวนที่ถูกต้อง')
                    }
                }
            })

            if (qty) {
                // ดึงข้อมูล listOrder จาก localStorage
                const existingList = localStorage.getItem('listOrder');
                // แปลงข้อมูลเป็น array ถ้าไม่มีข้อมูลให้ใช้ array ว่างเปล่า
                const listOrder = existingList ? JSON.parse(existingList) : [];
                // เพิ่มรายการใหม่เข้าไปใน array
                listOrder.push({ id: id, productName: productName, qty: qty });
                // เก็บ array ที่ปรับปรุงแล้วกลับไปที่ localStorage
                localStorage.setItem('listOrder', JSON.stringify(listOrder));

                Swal.fire({
                    icon: 'success',
                    title: 'เพิ่มสินค้าสำเร็จ',
                    text: 'สามารถเลือกสินค้าต่อได้เลย',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        } catch (error) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                icon: "error",
                showConfirmButton: false,
                timer: 1000
            })
        }
    }

    const fetchProduct = async () => {
        try {
            const res = await productService.getAllProduct()
            setCardData(res.data.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])


    return (
        <>
            {
                cardData.map((product, index) => (
                    <div className='col-3 my-1 mx-1' key={index}>
                        <div className="card" style={{ width: " 18rem;" }}>
                            <img className='card-img-top' src={`http://localhost:8080/api/product/image/${product._id}`} alt={product.name} />
                            <div className="card-body">
                                <h5 className='card-title'>{product.name}</h5>
                                <p className='card-text'>{product.price}</p>
                                <p className='card-text'>{product.category?.name}</p>
                                <button onClick={() => { handleAddCard(product._id, product.productName) }} className='btn btn-primary'>เพิ่มสินค้า</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}


export default Products