import React, { useEffect, useState } from 'react'
import orderService from '../../service/orderService'
import customerService from '../../service/customerService'
const CardSale = () => {
    const [orderPass, setOrderPass] = useState([])
    const [orderProcess, setOrderProcess] = useState([])
    const [orderFail, setOrderFail] = useState([])
    const [orderToCustomer , setOrderToCustomer] = useState([])
    const [customer,setCustomer] = useState([])


    const fetchOrderPass = async () => {
        try {
            const res = await orderService.searchOrderHistoryPass()
            setOrderPass(res.data.data)
        } catch (error) {
            
        }
    }

    const fetchOrderProcess = async () => {
        try {
            const res = await orderService.searchOrderHistoryProcess()
            setOrderProcess(res.data.data)
        } catch (error) {
            
        }
    }

    const fetchOrderFail = async () => {
        try {
            const res = await orderService.searchOrderHistoryFail()
            setOrderFail(res.data.data)
        } catch (error) {
            
        }
    }

    const fetchOrderToCustomer = async () => {
        try {
            const res = await orderService.searchOrderHistory()
            setOrderToCustomer(res.data.data)
        } catch (error) {
            
        }
    }


    const fetchCustomer = async () => {
        try {
            const res = await customerService.customerBysaleId()
            setCustomer(res.data.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchOrderPass()
        fetchOrderProcess()
        fetchOrderFail()
        fetchCustomer()
        fetchOrderToCustomer()
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{orderPass.length}</h3>
                            <p>ออร์เดอร์ที่อนุมัติแล้ว</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-android-checkbox-outline" />
                        </div>

                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{orderProcess.length}</h3>
                            <p>ใบเสนอราคาที่รออนุมัติ</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-android-create" />
                        </div>

                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>{orderFail.length}</h3>
                            <p>ใบเสนอราคาที่ไม่อนุมัติ</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-android-close" />
                        </div>

                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-secandary">
                        <div className="inner">
                            <h3>{orderToCustomer.length}</h3>
                            <p>ส่งให้ลูกค้าแล้ว</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-android-share" />
                        </div>

                    </div>
                </div>
                <div className="col-12">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{customer.length}</h3>
                            <p>จำนวนลูกค้า</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person" />
                        </div>

                    </div>
                </div>
                {/* ./col */}
            </div>
        </div>
    )
}

export default CardSale