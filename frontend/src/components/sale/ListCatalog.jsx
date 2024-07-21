import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import orderService from '../../service/orderService';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DownloadPDF from './DownloadPDF'
import { useNavigate } from 'react-router-dom';

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
                            <PDFDownloadLink className='btn btn-success text-light' document={<DownloadPDF dataOrder={data}/>} fileName={`order_${data._id}.pdf`}>
                                {({ loading }) => (loading ? 'กำลังโหลดเอกสาร...' : 'ดาวน์โหลดเอกสาร PDF')}
                            </PDFDownloadLink>
                        <button className='btn btn-secondary mx-3' onClick={() => navigate(`/sale/create/catagory/${data._id}`)}>ดูรายละเอียดเพิ่มเติม</button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
};

export default ListCatalog;
