import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customerService from '../../../../service/customerService';
import userService from '../../../../service/userService';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [sale, setSale] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sales, setSales] = useState([]);

  const fetchCustomer = async () => {
    try {
      const res = await customerService.customerById(id);
      if (res.status === 200) {
        const customer = res.data.data;
        setTitle(customer.title);
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
        setEmail(customer.email);
        setTel(customer.tel);
        setAddress(customer.address);
        setSale(customer.sale._id);
      } else {
        setError('Error fetching customer data');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      setError('Error fetching customer data');
    }
  };

  const fetchSales = async () => {
    try {
      const res = await userService.userAll();
      setSales(res.data.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
      setError('Error fetching sales data');
    }
  };

  useEffect(() => {
    if (id) {
      fetchCustomer();
      fetchSales();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCustomer = {
        title,
        firstName,
        lastName,
        email,
        tel,
        address,
        sale,
      };

      const { data } = await axios.put(`https://e-cattalog-backend.onrender.com/api/customer/update/${id}`, updatedCustomer);

      if (data?.success) {
        setError('Failed updating customer.');
        setSuccess('');
      } else {
        setSuccess('Customer updated successfully!');
        setError('');

        Swal.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จ!',
          text: 'Customer updated successfully.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        navigate('/sale/customers');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      setError('Error updating customer.');
      setSuccess('');
    }
  };

  const handleCancel = () => {
    navigate('/sale/customers');
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-2">
            <select
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-5">
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              name="tel"
              placeholder="Telephone"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Select Sale:</label>
          <select
          disabled
            className="custom-select custom-select-lg"
            name="sale"
            value={sale}
            onChange={(e) => setSale(e.target.value)}
            required
          >
            <option value="" disabled>เลือกเซลล์ประจำตัวลูกค้า</option>
            {sales?.map((sale) => (
              <option key={sale._id} value={sale._id}>
                {sale.title} {sale.firstName} {sale.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type='button' className='btn btn-danger mx-1' onClick={handleCancel}>
          ยกเลิก
        </button>
        <button type='submit' className='btn btn-primary'>
          แก้ไขข้อมูล
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;
