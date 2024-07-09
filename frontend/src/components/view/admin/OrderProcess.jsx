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
