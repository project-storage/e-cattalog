import React, { useEffect, useState } from 'react'
import orderService from '../../../service/orderService'
import productService from '../../../service/productService'
import customerService from '../../../service/customerService'
import userService from '../../../service/userService'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [sales, setSales] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.searchProcess()
        setOrders(res.data.data)
        console.log(res.data.data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    const fetchProducts = async () => {
      try {
        const res = await productService.getAllProduct()
        setProducts(res.data.data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    const fetchCustomers = async () => {
      try {
        const res = await customerService.customerAll()
        setCustomers(res.data.data)
      } catch (error) {
        console.error("Error fetching customers:", error)
      }
    }

    const fetchSales = async () => {
      try {
        const res = await userService.userAll()
        setSales(res.data.data)
      } catch (error) {
        console.error("Error fetching sales:", error)
      }
    }

    fetchOrders()
    fetchProducts()
    fetchCustomers()
    fetchSales()
  }, [])

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
            {orders.map((order, index) => (
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
                  <button className='btn btn-info'>รายละเอียดข้อมูลการสั่งซื่อ</button>
                </td>
                <td>
                  <button className='btn btn-success mr-1 mt-1' >ยืนยันออร์เดอร์</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Orders
