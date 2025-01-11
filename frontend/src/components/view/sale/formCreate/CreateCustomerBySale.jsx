import React, { useEffect, useState } from 'react';
import userService from '../../../../service/userService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateCustomerBySale = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    address: '',
    sale: ''
  });
  const [saleInfo, setSaleInfo] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const res = await userService.userInfo();
        setSaleInfo(res.data.data);
        setFormData((prevData) => ({
          ...prevData,
          sale: res.data.data._id  // Assuming the response contains the user's ObjectId in _id
        }));
      } catch (error) {
        console.error('Error fetching sale info:', error);
      }
    };
    fetchSale();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://e-cattalog-backend.onrender.com/api/customer/create', formData);
      setFormData({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        address: '',
        sale: saleInfo._id
      });
      Swal.fire({
        icon: 'success',
        title: 'เพิ่มข้อมูลสำเร็จ!',
        text: 'Customer created successfully.',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate('/sale/customers')
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.msg);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  const handleCancel = async () => {
    navigate('/sale/customers')
  }
  return (
    <div className='create-customer-sale'>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <select
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            >
              <option value="" disabled>เลือกคำนำหน้า</option>
              <option value="นาย.">นาย.</option>
              <option value="นาง.">นาง.</option>
              <option value="น.ส.">น.ส.</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              name="tel"
              placeholder="Telephone"
              value={formData.tel}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input type="hidden" name="sale" value={formData.sale} />
          <input
            type="text"
            className="form-control"
            name="saleName"
            placeholder="Sale"
            value={`${saleInfo.title} ${saleInfo.firstName} ${saleInfo.lastName}`}
            disabled
          />
        </div>
        <button type="submit" className="btn btn-danger mx-1" onClick={handleCancel}>ยกเลิก</button>
        <button type="submit" className="btn btn-primary">เพิ่มข้อมูลลูกค้า</button>
      </form>
    </div>
  );
};

export default CreateCustomerBySale;
