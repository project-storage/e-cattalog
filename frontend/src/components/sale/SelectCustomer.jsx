import React, { useEffect, useState } from 'react'
import customerService from '../../service/customerService'
import Swal from 'sweetalert2'

const SelectCustomer = () => {

  const [customer, setCustomer] = useState([])
  const [select,setSelect] = useState('')

  const fetchCustomer = async () => {
    const res = await customerService.customerBysaleId()
    setCustomer(res.data.data)
  }

  const handleSubmit = () => {
    if(select == ''){
      Swal.fire({
        title:"โปรดเลือกลูกค้า",
        icon:'error',
        timer:1000,
        showConfirmButton:false
      })
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