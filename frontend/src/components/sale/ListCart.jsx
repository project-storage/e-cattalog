import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ListCart = () => {
    const [chDiscount, setDiscount] = useState({});
    const [dataCartSS, setDataCartSS] = useState([]);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [FS, setFS] = useState(0);

    // ฟังก์ชันสำหรับแก้ไขส่วนลด
    const editDiscount = (e) => {
        const { name, value } = e.target; // ดึงค่าชื่อและค่าใหม่จากอีเวนต์

        const dataCartJson = localStorage.getItem('listOrder');
        const dataCart = JSON.parse(dataCartJson);

        // อัพเดตข้อมูลในรถเข็นสินค้าโดยเปลี่ยนส่วนลดตามประเภทสินค้า
        const updatedCart = dataCart.map((data) => {
            if (data.type.name === name) {
                return { ...data, discount: value };
            }
            return data;
        });

        // อัพเดต state และ localStorage
        setDataCartSS(updatedCart);
        localStorage.setItem('listOrder', JSON.stringify(updatedCart));

        // อัพเดต state สำหรับส่วนลด
        setDiscount((prevDiscounts) => ({
            ...prevDiscounts,
            [name]: value
        }));

        // กระตุ้นการ re-render
        setFS(!FS);
    };

    // ฟังก์ชันสำหรับแก้ไขจำนวนสินค้า
    const editQty = (e) => {
        const { name, value } = e.target; // ดึงค่าชื่อและค่าใหม่จากอีเวนต์

        const dataCartJson = localStorage.getItem('listOrder');
        const dataCart = JSON.parse(dataCartJson);

        // อัพเดตข้อมูลในรถเข็นสินค้าโดยเปลี่ยนจำนวนสินค้าตาม ID
        const updatedCart = dataCart.map((data) => {
            if (data.id == name) {
                return { ...data, qty: value };
            }
            return data;
        });

        // อัพเดต state และ localStorage
        setDataCartSS(updatedCart);
        localStorage.setItem('listOrder', JSON.stringify(updatedCart));

        // กระตุ้นการ re-render
        setFS(!FS);
    };

    // ฟังก์ชันสำหรับลบสินค้า
    const delProduct = (e) => {
        Swal.fire({
            title: "ต้องการลบสินค้าหรือไม่",
            icon: "info",
            showCancelButton: true,
            showConfirmButton: true,
            preConfirm: () => {
                const dataCartJson = localStorage.getItem('listOrder');
                const dataCart = JSON.parse(dataCartJson);

                // ลบสินค้าที่มี ID ตรงกับที่กดลบ
                const updatedCart = dataCart.filter((data) => data.id !== e.target.name);

                // อัพเดต localStorage และกระตุ้นการ re-render
                localStorage.setItem('listOrder', JSON.stringify(updatedCart));
                Swal.fire({
                    timer: 1000,
                    title: "ลบเสร็จสิ้น",
                    icon: "success",
                    showConfirmButton: false,
                    timerProgressBar: true,
                }).then(() => {
                    setFS(!FS);
                });
            }
        });
    };

    // useEffect สำหรับการโหลดข้อมูลสินค้าเมื่อคอมโพเนนต์ถูกสร้างหรือเมื่อ FS เปลี่ยนแปลง
    useEffect(() => {
        const dataCartJson = localStorage.getItem('listOrder');
        const dataCart = JSON.parse(dataCartJson);
        if (dataCart) {
            setDataCartSS(dataCart);
        }
    }, [FS]);

    // useEffect สำหรับการสร้างแถวในตารางตามข้อมูลสินค้า
    useEffect(() => {
        const newRows = [];
        let check = null;
        if (dataCartSS.length === 0) {
            // ถ้าไม่มีสินค้าในรถเข็น แสดงข้อความว่าไม่มีรายการสินค้า
            newRows.push(
                <tr key="no-items">
                    <td colSpan={6} style={{ textAlign: 'center' }}>ไม่มีรายการสินค้า</td>
                </tr>
            );
        }

        let Pretotal = 0; // ตัวแปรสำหรับคำนวณราคารวม
        dataCartSS.forEach((product, index) => {
            // ถ้าประเภทสินค้าปัจจุบันไม่เหมือนกับประเภทสินค้าที่เช็คไว้
            if (check !== product.type.name) {
                newRows.push(
                    <tr key={`type-${product.type.name}`}>
                        <td colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                          ประเภทสินค้า: {product.type.name}
                        </td>
                        <td colSpan={2} style={{ textAlign: 'end' }}>
                            <input
                                className=""
                                type="number"
                                defaultValue={product.discount || 0}
                                name={product.type.name}
                                min={0}
                                onChange={editDiscount}
                                style={{ height: "30px", width: "60px" }}
                                max={100}
                            />
                        </td>
                    </tr>
                );
                check = product.type.name; // อัพเดตประเภทสินค้าที่เช็คไว้
            }

            // คำนวณราคารวมและราคารวมหลังหักส่วนลด
            const sum = product.price * product.qty;
            const discount = sum * (product.discount / 100);
            const sumDiscount = sum - discount;
            Pretotal += sumDiscount;

            // สร้างแถวสำหรับสินค้าแต่ละรายการ
            newRows.push(
                <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td style={{ width: 90 }}>
                        <input
                            type="number"
                            min={1}
                            onChange={editQty}
                            name={product.id}
                            className='form-control'
                            defaultValue={product.qty}
                        />
                    </td>
                    <td>
                        <button className='btn btn-danger' onClick={delProduct} name={product.id}>ลบ</button>
                    </td>
                    <td className="text-center" >
                        <p>
                            {product.price}
                            <span> ฿</span>
                        </p>
                    </td>
                    <td >
                        <p>
                            {sum} <span> ฿</span> /
                            {sumDiscount} <span> ฿</span>
                        </p>
                    </td>
                </tr>
            );
        });

        setTotal(Pretotal); // อัพเดตยอดรวม
        setRows(newRows); // อัพเดตแถวในตาราง
    }, [dataCartSS]);

    return (
        <>
            <table className='table text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>รายการ</th>
                        <th>จำนวน</th>
                        <th>action</th>
                        <th>ราคา/หน่วย</th>
                        <th>รวม/หักส่วนลด</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr>
                        <td colSpan={6} style={{ textAlign: "end", fontWeight: 'bold' }}>ราคารวม : <input type="number" value={total.toFixed(2)} disabled className='text-center' /> </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default ListCart;
