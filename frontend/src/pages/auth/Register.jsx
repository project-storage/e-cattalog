import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../service/authService'; // Adjust the path as needed
import Swal from 'sweetalert2';

const Register = () => {
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
                timer: 1500
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
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: "การลงทะเบียนล้มเหลว",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='hold-transition register-page'>
            <div className="register-box">
                <div className="register-logo">
                    <b>ระบบ</b>จัดการใบเสนอราคา
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">สมัครใช้งานเพื่อเป็นสมาชิกระบบ</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
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
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    name="firstName"
                                    value={registerData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"
                                    name="lastName"
                                    value={registerData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                    value={registerData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Retype password"
                                    name="confirmPassword"
                                    value={registerData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Phone number"
                                    name="tel"
                                    value={registerData.tel}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-phone" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                        {loading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
