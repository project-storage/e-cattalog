import React, { useEffect, useState } from 'react';
import customerService from '../../service/customerService';
import Swal from 'sweetalert2';
import orderService from '../../service/orderService';
import userService from '../../service/userService';
import { useNavigate } from 'react-router-dom';

const SelectCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const [sale, setSale] = useState({});
  const [select, setSelect] = useState('');
  const [project, setProject] = useState('No');
  const [newOrder, setNewOrder] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await customerService.customerBysaleId();
        setCustomer(res.data.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    const fetchSaleInfo = async () => {
      try {
        const res = await userService.userInfo();
        setSale(res.data.data);
      } catch (error) {
        console.error("Failed to fetch sale info:", error);
      }
    };

    const fetchNewOrder = async () => {
      try {
        const res = await orderService.newOrde();
        setNewOrder(res.data.data[0].estNo); // Assuming estNo is in the format "YYMMNNNN"
      } catch (error) {
        console.error("Failed to fetch new order:", error);
      }
    };

    fetchNewOrder();
    fetchCustomer();
    fetchSaleInfo();
  }, []);

  const handleSubmit = async () => {
    if (!select || project === 'No') {
      Swal.fire({
        title: "โปรดกรอกข้อมูลให้ครบถ้วน",
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
      return;
    }

    const DataJson = localStorage.getItem('listOrder');
    const Data = JSON.parse(DataJson) || [];
    const createData = [];
    let totalPrice = 0;

    Data.forEach((data) => {
      const sum = data.price * data.qty;
      const discount = sum * (data.discount / 100);
      const sumDiscount = sum - discount;
      totalPrice += sumDiscount;
      createData.push({
        product: data.id,
        qty: data.qty,
        discount: data.discount,
        finalPrice: sumDiscount
      });
    });

    // Generate new estNo by incrementing the last one
    // const newEstNo = String(parseInt(newOrder) + 1).padStart(8, "0");

    const reqBody = {
      estNo: newOrder,
      customer: select,
      sale: sale._id,
      products: createData,
      totalPrice,
      project
    };

    try {
      const res = await orderService.createOrder(reqBody);
      if (res.status === 201) {
        Swal.fire({
          title: 'ส่งข้อมูลเสร็จสิ้น',
          text: "อยู่ระหว่างการตรวจสอบของ Admin",
          timer: 1000,
          showConfirmButton: false,
          timerProgressBar: true,
          icon: "success"
        }).then(() => {
          localStorage.removeItem('listOrder');
          navigate('/sale/products');
        });
      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: "โปรดยืนยันรายการสินค้าใหม่อีกครั้ง",
          timer: 1000,
          showConfirmButton: false,
          timerProgressBar: true,
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: "ไม่สามารถส่งข้อมูลได้",
        timer: 1000,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: "error"
      });
      console.error("Failed to create order:", error);
    }
  };

  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  const newEstNo = String(parseInt(newOrder) + 1).padStart(8, "0");
  return (
    <>
      <p>Est No: {newEstNo}</p>
      <label htmlFor="">เลือกรายชื่อลูกค้า</label>
      <select className='form-control my-1' onChange={handleSelectChange} value={select}>
        <option value="">โปรดเลือกลูกค้า</option>
        {customer.map((data) => (
          <option key={data._id} value={data._id}>
            {data.firstName} {data.lastName}
          </option>
        ))}
      </select>
      <label htmlFor="">ใส่ชื่อ Project</label>
      <input type="text" className='form-control' onChange={(e) => setProject(e.target.value)} value={project} />
      <input type="hidden" name="sale" value={sale._id} />
      <input
        type="text"
        className="form-control mt-2"
        name="saleName"
        placeholder="Sale"
        value={`${sale.title} ${sale.firstName} ${sale.lastName}`}
        disabled
      />
      <button className='btn btn-success form-control mt-2' onClick={handleSubmit}>ยืนยันรายการสินค้า</button>
    </>
  );
};

export default SelectCustomer;
