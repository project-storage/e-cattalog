import React, { useEffect, useState } from 'react'
import orderService from '../../service/orderService'
import customerService from '../../service/customerService'
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const LogCatagory = () => {
    const [dataOrder, setDataOrder] = useState([]);
    const [dataCustomer, setDataCustomer] = useState([]);
    const navigate = useNavigate()
    const fetchOrder = async (data) => {
        const res = await orderService.searchToCustomer(data)
        setDataOrder(res.data.data);
        console.log(res.data.data)
    }
    const fetchCustomer = async () => {
        const res = await customerService.customerBysaleId()
        setDataCustomer(res.data.data)
    }

    useEffect(() => {
        fetchCustomer()
    }, [])
    return (
        <>
            <div className="container pt-3">
                <select className='form-control ' onChange={(e) => { fetchOrder(e.target.value) }} name="" id="">
                    <option selected>โปรดเลือกลูกค้า</option>
                    {dataCustomer.map((data) => (
                        <option value={data._id}>{data.title}{data.firstName} {data.lastName}</option>
                    ))}
                </select>
                <hr />


                {dataOrder && dataOrder.map((data, index) => (
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
                                        <td colSpan={5} className='me-2' style={{ textAlign: 'end' }}>ราคารวม : {data.totalPrice} บาท</td>
                                    </tr>
                                </tbody>
                            </table>

                            <button className='btn btn-secondary mx-3' onClick={() => navigate(`/sale/order/create-pdf/${data._id}`)}>ดูรายละเอียดเพิ่มเติม</button>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </>
    )
}

export default LogCatagory