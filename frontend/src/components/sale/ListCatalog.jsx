import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import orderService from '../../service/orderService'
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const ListCatalog = () => {
    const [dataOrderPass, setdataOrderPass] = useState([])
    const [dataProduct, setDataProduct] = useState([])
    const fetchOrderByPass = async () => {
        try {
            const res = await orderService.searchPass()
            setdataOrderPass(res.data.data)
            console.log(res.data.data)
        } catch (error) {
            console.log(error)
        }

    }
    const generatePDF = () => {
        const doc = new jsPDF();

        // ข้อมูลตัวอย่าง
        const invoice = {
            company: 'My Company',
            address: '123 Main St, Anytown, USA',
            phone: '555-555-5555',
            email: 'info@mycompany.com',
            date: '2024-07-11',
            items: [
                { description: 'Item 1', quantity: 2, price: 10 },
                { description: 'Item 2', quantity: 1, price: 20 },
                { description: 'Item 3', quantity: 3, price: 15 }
            ],
            total: 95
        };

        // ส่วนหัวบิลใบเสร็จ
        doc.setFontSize(18);
        doc.text(invoice.company, 14, 22);
        doc.setFontSize(12);
        doc.text(invoice.address, 14, 30);
        doc.text(invoice.phone, 14, 36);
        doc.text(invoice.email, 14, 42);
        doc.text(`Date: ${invoice.date}`, 14, 48);

        // เพิ่มตาราง
        doc.autoTable({
            startY: 60,
            head: [['Description', 'Quantity', 'Price', 'Total']],
            body: invoice.items.map(item => [item.description, item.quantity, item.price, item.quantity * item.price])
        });

        // ส่วนท้ายบิลใบเสร็จ
        doc.setFontSize(12);
        doc.text(`Total: $${invoice.total}`, 14, doc.autoTable.previous.finalY + 10);

        // บันทึก PDF
        doc.save('invoice.pdf');
    };

    useEffect(() => {
        fetchOrderByPass()
    }, [])


    return (
        <>
            {dataOrderPass.map((data) => (
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        {data.customer.title}{data.customer.firstName} {data.customer.lastName}
                    </AccordionSummary>
                    <AccordionDetails>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>รายการสินค้า</th>
                                    <th>จำนวน</th>
                                    <th>ราคา/หน่วย</th>
                                    <th>ราคารวม</th>
                                    <th>ส่วนลด</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.products.map((dataProduct) => (
                                        <tr>
                                            <td>{dataProduct.product.name}</td>
                                            <td>{dataProduct.qty}</td>
                                            <td>{dataProduct.product.price}</td>
                                            <td>{dataProduct.finalPrice}</td>
                                            <td>{dataProduct.discount}%</td>
                                        </tr>
                                    ))}

                                <tr>
                                    <td colSpan={5} className='me-2' style={{ textAlign: 'end' }}>ราคารวม : {data.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='btn btn-success'>ออกใบเสนอราคา</button>
                        <button className='btn btn-secondary mx-3' onClick={generatePDF}>PDF</button>
                    </AccordionDetails>
                </Accordion>
            ))}

        </>
    )
}

export default ListCatalog