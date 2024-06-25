import React from 'react'
import { useNavigate } from 'react-router-dom'

const Customers = () => {
  const navigate = useNavigate()

  const handleCreate = async () => {
    navigate('/sale/customer/create')
  }
  return (
    <div className='tb-customers'>
      <button className='btn btn-primary' onClick={handleCreate}>เพิ่มข้อมูล</button>
    </div>
  )
}

export default Customers