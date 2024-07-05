import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import authService from '../../../../service/authService';

const CreateSale = () => {
  const [registerData, setRegisterData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    tel: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "รหัสผ่านไม่ตรงกัน",
        showConfirmButton: false,
        timer: 1000
      });
      setLoading(false);
      return;
    }

    try {
      await authService.register(registerData); // Assuming authService has a register method
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ลงทะเบียนสำเร็จ!",
        showConfirmButton: false,
        timer: 1000
      });
      navigate('/admin/sales');
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "การลงทะเบียนล้มเหลว",
        showConfirmButton: false,
        timer: 1000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/sales');
  };

  return (
    <div className='form-create-sale'>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-2">
            <select
              className="form-control"
              name="title"
              value={registerData.title}
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
              value={registerData.firstName}
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
              value={registerData.lastName}
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
              value={registerData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="tel"
              className="form-control"
              name="tel"
              placeholder="Telephone"
              value={registerData.tel}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mx-1" disabled={loading}>
          {loading ? 'กำลังสร้างข้อมูล' : 'ยืนยัน'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateSale;
