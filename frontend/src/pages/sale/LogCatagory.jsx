import React, { useEffect, useState } from 'react'
import orderService from '../../service/orderService'
import customerService from '../../service/customerService'
const LogCatagory = () => {
    const [dataOrder,setDataOrder] = useState([]);
    const [dataCustomer, setDataCustomer] = useState([]);
    
    const fetchOrder = async (data) => {
        const body = {customer : data}
        const res = await orderService.searchToCustomer(body)
        console.log(res.data.data)
    }
    const fetchCustomer = async () => {
        const res = await customerService.customerBysaleId()
        setDataCustomer(res.data.data)
        console.log(res.data.data)
    }

    useEffect(() => {
        fetchCustomer()
    },[])
  return (
    <>
    <div className="container pt-3">
        <select className='form-control ' onChange={(e) => {fetchOrder(e.target.value)}} name="" id="">
            <option selected>โปรดเลือกลูกค้า</option>
            { dataCustomer.map((data) => (
                <option value={data._id}>{data.title}{data.firstName} {data.lastName}</option>
            ))}
        </select>
        <hr />
    </div>
    </>
  )
}

export default LogCatagory