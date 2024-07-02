import React, { useEffect, useState } from 'react';
import userService from '../../../../service/userService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    address: '',
    sale: ''
  });
  const [sales, setSales] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await userService.userAll();
        setSales(res.data.data); // Assuming res.data is an array of sales objects
        if (res.data.data.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            sale: res.data.data[0]._id // Default to first sale ID
          }));
        }
      } catch (error) {
        console.error('Error fetching sale info:', error);
      }
    };
    fetchSales();
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

    try {
      const response = await axios.post('http://localhost:8080/api/customer/create', formData);
      setSuccess(response.data.msg);
      setFormData({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        address: '',
        sale: formData.sale // Keep the selected sale ID
      });

      Swal.fire({
        icon: 'success',
        title: 'เพิ่มข้อมูลสำเร็จ!',
        text: 'Customer created successfully.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate('/admin/customers');

    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.msg);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/admin/customers');
  };

  return (
    <div>
      <h2>Create Customer</h2>
      {error && <div className="alert alert-danger">{error}</div>}
         <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-2">
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
          <div className="form-group col-md-5">
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
          <div className="form-group col-md-5">
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
          <textarea
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
          <label>Select Sale:</label>
          <select
            className="custom-select custom-select-lg"
            name="sale"
            value={formData.sale}
            onChange={handleChange}
            required
          >
            <option value="" disabled>เลือกเซลล์ประจำตัวลูกค้า</option>
            {sales.map((sale) => (
              <option key={sale._id} value={sale._id}>
                {sale.title} {sale.firstName} {sale.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-danger mx-1" onClick={handleCancel}>ยกเลิก</button>
        <button type="submit" className="btn btn-primary">เพิ่มข้อมูลลูกค้า</button>
      </form>
    </div>
  );
};

export default CreateCustomer;
