import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import orderService from '../../service/orderService';
import { NavLink, useNavigate } from 'react-router-dom'


const ListCatalog = () => {
    const [dataOrderPass, setdataOrderPass] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const navigate = useNavigate()
    const fetchOrderByPass = async () => {
        try {
            const res = await orderService.searchPass();
            setdataOrderPass(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const selectOrder = (id) => {
        const selectedOrder = dataOrderPass.find((data) => data._id === id);
        if (selectedOrder) {
            setDataProduct(selectedOrder);
            generatePDF(selectedOrder);
        }
    };

    const generatePDF = (order) => {
        var docDefinition = {
            content: [
                { text: 'สร้าง PDF ภาษาไทยด้วย pdfmake ', fontSize: 15 },
            ],
            defaultStyle: {
                font: 'THSarabunNew'
            }
        };
        pdfMake.createPdf(docDefinition).open()
    };

    useEffect(() => {
        fetchOrderByPass();
    }, []);

    return (
        <>
            {dataOrderPass.map((data) => (
                <Accordion key={data._id}>
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
                        <button className='btn btn-success'>ออกใบเสนอราคา</button>
                        <button className='btn btn-secondary mx-3' onClick={() => {navigate(`/sale/create/catagory/${data._id}`)}}>PDF</button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
};

export default ListCatalog;
