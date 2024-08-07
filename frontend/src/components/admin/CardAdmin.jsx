import React, { useEffect, useState } from 'react';
import userService from '../../service/userService';
import customerService from '../../service/customerService';
import orderService from '../../service/orderService';

const CardAdmin = () => {
  const [countCustomeries, setCountCustomeries] = useState(0);
  const [countSales, setCountSales] = useState(0);
  const [countOrderies, setCountOrderies] = useState(0);

  const fetchCountSale = async () => {
    try {
      const res = await userService.userAll();
      setCountSales(res.data.data.length);
    } catch (error) {
      console.error('Error fetching sales count:', error);
    }
  };

  const fetchCountCustomer = async () => {
    try {
      const res = await customerService.customerAll();
      setCountCustomeries(res.data.data.length);
    } catch (error) {
      console.error('Error fetching customer count:', error);
    }
  };

  const fetchCountOrderies = async () => {
    try {
      const res = await orderService.orders();
      setCountOrderies(res.data.data.length);
    } catch (error) {
      console.error('Error fetching order count:', error);
    }
  };

  useEffect(() => {
    fetchCountSale();
    fetchCountCustomer();
    fetchCountOrderies();
  }, []);

  return (
    <div className="card-admin">
      <div className="row">
        <div className="col-lg-4 col-12 mb-4">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{countOrderies}</h3>
              <p>ออร์เดอร์ทั้งหมด</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        <div className="col-lg-4 col-12 mb-4">
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>{countSales}</h3>
              <p>เซลล์ทั้งหมด</p>
            </div>
            <div className="icon">
              <i className="ion ion-person" />
            </div>
            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        <div className="col-lg-4 col-12 mb-4">
          <div className="small-box bg-primary">
            <div className="inner">
              <h3>{countCustomeries}</h3>
              <p>ลูกค้าทั้งหมด</p>
            </div>
            <div className="icon">
              <i className="ion ion-person" />
            </div>
            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardAdmin;
