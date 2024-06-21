import React, { useEffect, useState } from 'react'
import productService from '../../service/productService'
import Swal from 'sweetalert2'
const CardProduct = () => {
    const [cardData, setCardData] = useState([])

    const handleAddCard = (id,productName) => {
        try {
            Swal.fire({
                title: "จำนวนสินค้า",
                input: "number",
                inputValue: 1,
                preConfirm: () => {
                    console.log(Swal.getInput().value)
                    // ดึงข้อมูล listOrder จาก localStorage
                    const existingList = localStorage.getItem('listOrder');
                    // แปลงข้อมูลเป็น array ถ้าไม่มีข้อมูลให้ใช้ array ว่างเปล่า
                    const listOrder = existingList ? JSON.parse(existingList) : [];
                    // เพิ่มรายการใหม่เข้าไปใน array
                    listOrder.push({ id: id ,productName:productName, qty: Swal.getInput().value});
                    // เก็บ array ที่ปรับปรุงแล้วกลับไปที่ localStorage
                    localStorage.setItem('listOrder', JSON.stringify(listOrder));
                    window.location.reload()
                }
            })
        } catch (error) {
            Swal.fire({
                title:"เกิดข้อผิดพลาด",
                icon:"error",
                showConfirmButton:false,
                timer:1000
            })
        }
        

    };

    const fetchProduct = async () => {
        const res = await productService.getAllProduct()
        setCardData(res.data.data)
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            {
                cardData.map((product, index) => (
                    <div className='col-3 my-1 mx-1' key={index}>
                        <div className="card">
                            <div className="card-body">
                                <img src={product.image} alt={product.productName} />
                                <p>{product.productName}</p>
                                <p>{product.price}</p>
                                <button onClick={() => { handleAddCard(product._id,product.productName) }} className='btn btn-primary'>เพิ่มสินค้า</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default CardProduct