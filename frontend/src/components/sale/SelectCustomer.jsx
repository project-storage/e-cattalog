import React, { useEffect, useState } from 'react'
import customerService from '../../service/customerService'
import Swal from 'sweetalert2'
import orderService from '../../service/orderService'
import userService from '../../service/userService'
import { useNavigate } from 'react-router-dom'

const SelectCustomer = () => {
  const [customer, setCustomer] = useState([])
  const [sale, setSale] = useState({})
  const [select, setSelect] = useState('')

  const navigate = useNavigate()

  const fetchCustomer = async () => {
    const res = await customerService.customerBysaleId()
    setCustomer(res.data.data)
  }

  const fetchSaleInfo = async () => {
    const res = await userService.userInfo()
    setSale(res.data.data)
  }

  const handleSubmit = async () => {
    if (select === '') {
      Swal.fire({
        title: "โปรดเลือกลูกค้า",
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      })
    } else {
      const DataJson = localStorage.getItem('listOrder')
      const Data = JSON.parse(DataJson)
      const createData = []
      let totalPrice = 0
      Data.forEach((data) => {
        const sum = data.price * data.qty
        const discount = sum * (data.discount / 100)
        const sumDiscount = sum - discount
        totalPrice += sumDiscount
        createData.push({
          product: data.id,
          qty:data.qty,
          discount: data.discount,
          finalPrice: sumDiscount
        })
      })
      const reqBody = {
        customer: select,
        sale: sale._id,
        products: createData,
        totalPrice: totalPrice
      }
      console.log(reqBody)

      const res = await orderService.createOrder(reqBody)
      if (res.status === 201) {
        Swal.fire({
          title: 'ส่งข้อมูลเสร็จสิ้น',
          text: "อยู่ระหว่างการตรวจสอบของ Admin",
          timer: 1000,
          showConfirmButton: false,
          timerProgressBar: true,
          icon: "success"
        }).then(() => {
          localStorage.removeItem('listOrder')
          navigate('/sale/products')
        })

      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: "โปรดยืนยันรายการสินค้าใหม่อีกครั้ง",
          timer: 1000,
          showConfirmButton: false,
          timerProgressBar: true,
          icon: "error"
        })
      }
    }
  }

  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    fetchCustomer()
    fetchSaleInfo()
  }, [])

  return (
    <>
      <label htmlFor="">เลือกรายชื่อลูกค้า</label>
      <select className='form-control' onChange={handleSelectChange} name="" id="">
        <option value="">โปรดเลือกลูกค้า</option>
        {customer.map((data) => (
          <option key={data._id} value={data._id}>
            {data.firstName} {data.lastName}
          </option>
        ))}
      </select>
      <input type="hidden" name="sale" value={sale._id} />
      <input
        type="text"
        className="form-control mt-2"
        name="saleName"
        placeholder="Sale"
        value={`${sale.title}${sale.firstName} ${sale.lastName}`}
        disabled
      />
      <button className='btn btn-success form-control mt-2' onClick={handleSubmit}>ยืนยันรายการสินค้า</button>
    </>
  )
}

export default SelectCustomer
