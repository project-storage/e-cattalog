import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import orderService from '../../service/orderService';
import { PDFDownloadLink ,pdf} from '@react-pdf/renderer';
import DownloadPDF from './DownloadPDF'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const ListCatalog = () => {
    const [dataOrderPass, setdataOrderPass] = useState([]);
    const navigate = useNavigate();

    const fetchOrderByPass = async () => {
        try {
            const res = await orderService.searchPass();
            setdataOrderPass(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDownloadClick = async (data) => {
        
        const result = await Swal.fire({
            title: 'ยืนยันการดาวน์โหลด?',
            text: "เมื่อกดดาวโหลดสถานะจะเปลี่ยนเป็นส่งให้ลูกค้าแล้ว โปรดทำการส่งใบเสนอราคาให้ลูกค้่าหลังจากกดยืนยัน",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน!'
        });

        if (result.isConfirmed) {

            // สร้างไฟล์ PDF ในเบราว์เซอร์
            const doc = <DownloadPDF dataOrder={data} />;
            const asBlob = await pdf(doc).toBlob();

            // สร้างลิงก์ดาวน์โหลดชั่วคราว
            const link = document.createElement('a');
            link.href = URL.createObjectURL(asBlob);
            link.download = `order_${data._id}.pdf`;
            link.click();

            // ล้างลิงก์หลังจากการดาวน์โหลด
            URL.revokeObjectURL(link.href);
            updateStatusOrder(data)
            
        }
    };

    const updateStatusOrder = async (data) => {
        data.status = "toCustomer"
        const res = await orderService.updateOrder(data._id,{status:'toCustomer'})
        console.log(res)
    }

    useEffect(() => {
        fetchOrderByPass();
    }, []);

    return (
        <>
            {dataOrderPass.map((data) => (
                <Accordion key={data._id} className='mx-3 my-3 bg-gary-100'>
                    <AccordionSummary
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        {data.customer.title} {data.customer.firstName} {data.customer.lastName}
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
                                {data.products.map((dataProduct) => (
                                    <tr key={dataProduct.product._id}>
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

                        <button
                            className='btn btn-success text-light'
                            onClick={() => {handleDownloadClick(data)}}
                        >
                            ดาวน์โหลดเอกสาร PDF
                        </button>

                        <button className='btn btn-secondary mx-3' onClick={() => navigate(`/sale/create/catagory/${data._id}`)}>ดูรายละเอียดเพิ่มเติม</button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
};

export default ListCatalog;
