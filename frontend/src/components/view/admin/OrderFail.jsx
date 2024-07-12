import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import orderService from '../../../service/orderService'

const OrderFail = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await orderService.searchFail()
                setOrders(res.data.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching orders:", error)
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    const handleOrderDetail = (id) => {
        navigate(`/admin/order/fail/detail/${id}`)
    }

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
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
                                    <td><p className='bg-danger'>{order.status}</p></td>
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

export default OrderFail