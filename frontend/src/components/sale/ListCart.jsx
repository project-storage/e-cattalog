import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
const ListCart = () => {
    const [chDiscount, setDiscount] = useState([])
    const [dataCartSS, setDataCartSS] = useState([])
    const [dataCh, setDataCh] = useState([[]]);
    const [rows, setRows] = useState([])
    const [total, setTotal] = useState(0)
    const [FS,setFS] = useState(0);

    const editDiscount = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);

        const dataCartJson = localStorage.getItem('listOrder');
        const dataCart = JSON.parse(dataCartJson);

        // สร้างสำเนาใหม่ของ dataCart เพื่อหลีกเลี่ยงการเปลี่ยนแปลงข้อมูลโดยตรง
        const updatedCart = dataCart.map((data) => {
            if (data.type === e.target.name) {
                return { ...data, discount: e.target.value };
            }
            return data;
        });

        // อัพเดต state ด้วยข้อมูลใหม่
        setDataCh(updatedCart);

        // อัพเดตข้อมูลใน localStorage ด้วยข้อมูลใหม่
        localStorage.setItem('listOrder', JSON.stringify(updatedCart));
        setFS(!FS);
    };

    const editQty = (e) => {
        const dataCartJson = localStorage.getItem('listOrder');
        const dataCart = JSON.parse(dataCartJson);

        const updatedCart = dataCart.map((data) => {
            if (data.id == e.target.name) {
                return { ...data, qty: e.target.value }
            }
            return data
        })

        // อัพเดต state ด้วยข้อมูลใหม่
        setDataCh(updatedCart);

        // อัพเดตข้อมูลใน localStorage ด้วยข้อมูลใหม่
        localStorage.setItem('listOrder', JSON.stringify(updatedCart));
        setFS(!FS);
    }

    const delProduct = (e) => {
        Swal.fire({
            title: "ต้องการลบสินค้าหรือไม่",
            icon: "info",
            showCancelButton: true,
            showConfirmButton: true,
            preConfirm: () => {
                const dataCartJson = localStorage.getItem('listOrder');
                const dataCart = JSON.parse(dataCartJson);

                // ใช้ map เพื่อสร้าง updatedCart โดยลบสินค้าที่มี id ตรงกับ e.target.name ออก
                const updatedCart = dataCart.filter((data) => data.id !== e.target.name);

                // อัปเดต localStorage ด้วย updatedCart ที่ถูกแก้ไขแล้ว
                localStorage.setItem('listOrder', JSON.stringify(updatedCart));
                Swal.fire({
                    timer: 1000,
                    title: "ลบเสร็จสิ้น",
                    icon: "success",
                    showConfirmButton: false,
                    timerProgressBar: true,
                }).then(() => {
                    window.location.reload()
                })
            }
        })

    }
    useEffect(() => {
        const dataCartJson = localStorage.getItem('listOrder');
        const dataCart = JSON.parse(dataCartJson);
        if (dataCart) {
            setDataCartSS(dataCart);
        }
    }, [FS]);

    useEffect(() => {
        const newRows = [];
        let check = null;
        if (dataCartSS.length == 0) {
            newRows.push(
                <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>ไม่มีรายการสินค้า</td>
                </tr>

            )

        }
        let Pretotal = 0
        dataCartSS.forEach((product, index) => {
            if (check !== product.type) {
                newRows.push(
                    <tr>
                        <td colSpan={5} style={{ textAlign: 'end' }} className=''>
                            <input type="number"  defaultValue={product.discount} name={product.type} min={0} onChange={editDiscount} style={{ height: "30px", width: "60px" }} max={100} />
                        </td>
                    </tr>
                );
                check = product.type;
                const data = [product.id, product.type]
                setDiscount([...chDiscount, data])
            } else {
                const data = [product.id, product.type]
                setDiscount([...chDiscount, data])
            }

            const sum = product.price*product.qty
            const discount = sum*(product.discount/100)
            const sumDiscount = sum-discount
            Pretotal = Pretotal+sumDiscount

            setTotal(Pretotal)
            newRows.push(
                <tr key={index}>
                    <td>{product.productName}</td>
                    <td style={{ width: 90 }}><input type="number" min={1} onChange={editQty} name={product.id} className='form-control' defaultValue={product.qty} /></td>
                    <td className='d-flex justify-content-center'><button className='btn btn-danger' onClick={delProduct} name={product.id}>ลบ</button></td>
                    <td>{product.price}</td>
                    <td>{sum}/{sumDiscount}</td>
                </tr>
            );
        });
        setRows(newRows);
    }, [dataCartSS]);


    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th >รายการ</th>
                        <th >จำนวน</th>
                        <th></th>
                        <th>ราคา/หน่วย</th>
                        <th>รวม/หักส่วนลด</th>

                    </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr>
                        <td colSpan={5} style={{textAlign:"end" ,fontWeight:'bold'}}>ราคารวม : {total} </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default ListCart;
