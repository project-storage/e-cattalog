import React, { useEffect, useState } from 'react'
import orderService from '../../../service/orderService'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const OrderProcess = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.searchProcess()
        setOrders(res.data.data)
      } catch (error) {
        console.error("Error fetching orders:", error)
       
      }
    }

    fetchOrders()
  }, [])

  const handleOrderDetail = (id) => {
    navigate(`/admin/order/process/detail/${id}`)
  }

  const handleConfirmOrder = async (id) => {
    try {
      await orderService.updateOrder(id, { status: 'pass' })
      // Refresh orders list after updating the status
      const res = await orderService.searchProcess()
      setOrders(res.data.data)

      Swal.fire({
        icon: 'success',
        title: 'Confirmed!',
        text: 'Order confirmed successfully.',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating order status:", error)
      // Optionally, show an error message to the user
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error confirming order. Please try again later.',
      });
    }
  }

  const handleFailOrder = async (id) => {
    try {
      await orderService.updateOrder(id, { status: 'fail' })
      // Refresh orders list after updating the status
      const res = await orderService.searchProcess()
      setOrders(res.data.data)

      Swal.fire({
        icon: 'success',
        title: 'Failed!',
        text: 'Order marked as failed successfully.',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating order status:", error)
      // Optionally, show an error message to the user
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error marking order as failed. Please try again later.',
      });
    }
  }

  return (
    <div className='tb-orders'>
      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ลูกค้า</th>
              <th scope="col">สถานะ</th>
              <th scope="col">เซลล์</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>
                    {`${order.customer?.title}${order.customer?.firstName} ${order.customer?.lastName}`}
                  </td>
                  <td><p className='bg-warning'>{order.status}</p></td>
                  <td>
                    {`${order.sale?.title}${order.sale?.firstName} ${order.sale?.lastName}`}
                  </td>
                  <td>
                    <button className='btn btn-info mt-1' onClick={() => handleOrderDetail(order._id)}>รายละเอียดข้อมูลการสั่งซื้อ</button>
                  </td>
                  <td>
                    <button className='btn btn-success mr-2 mt-1' onClick={() => handleConfirmOrder(order._id)}>ยืนยันออร์เดอร์</button>
                    <button className='btn btn-danger mt-1' onClick={() => handleFailOrder(order._id)}>ออร์เดอร์ผิดพลาด</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderProcess
