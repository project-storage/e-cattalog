import React, { useEffect, useState } from 'react'
import customerService from '../../service/customerService'
import Swal from 'sweetalert2'
import orderService from '../../service/orderService'

const SelectCustomer = () => {

  const [customer, setCustomer] = useState([])
  const [select, setSelect] = useState('')

  const fetchCustomer = async () => {
    const res = await customerService.customerBysaleId()
    setCustomer(res.data.data)
  }

  const handleSubmit =async () => {
    if (select == '') {
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
      let totalPrice =0
      Data.map((data) => {
        const sum = data.price * data.qty
        const discount = sum * (data.discount / 100)
        const sumDiscount = sum - discount
        totalPrice += sumDiscount
        createData.push({
          product: data.id,
          discount: data.discount,
          finalPrice:sumDiscount
        })
      })
      const reqBody = {
        customer:select,
        product:createData,
        totalPrice:totalPrice
      }

      const res = await orderService.createOrder(reqBody)
      if(res.status == '201'){
        Swal.fire({
          title:'ส่งข้อมูลเสร็จสิ้น',
          text:"อยู่ระหว่างการตรวจสอบของ Admin",
          timer:1300,
          showConfirmButton:false,
          timerProgressBar:true,
          icon:"success"
        }).then(() => {
          localStorage.removeItem('listOrder')
          window.location.reload()
        })
        
      }else{
        Swal.fire({
          title:'เกิดข้อผิดพลาด',
          text:"โปรดยืนยันรายการสินค้าใหม่อีกครั้ง",
          timer:1300,
          showConfirmButton:false,
          timerProgressBar:true,
          icon:"error"
        })
      }
    }
    console.log(select)
  }
  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    fetchCustomer()

  }, [])

  return (
    <>
      <label htmlFor="">เลือกรายชื่อลูกค้า</label>
      <select className='form-control' onChange={handleSelectChange} name="" id="">
        <option value={null}>โปรดเลือกลูกค้า</option>
        {customer.map((data, index) => (
          <option key={data._id} value={data._id}>
            {data.firstName} {data.lastName}
          </option>
        ))}

      </select>

      <button className='btn btn-success form-control mt-2' onClick={handleSubmit} >ยืนยันรายการสินค้า</button>
    </>
  )
}

export default SelectCustomer