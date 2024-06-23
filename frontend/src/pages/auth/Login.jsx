import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import authService from '../../service/authService';
import Swal from 'sweetalert2';

const Login = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await authService.login(loginData);
            const userRole = res.data.data.role;
            localStorage.setItem("token", res.data.data.token);

            switch (userRole) {
                case "admin":
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าสู่ระบบ',
                        text: 'ยินดีต้อนรับเข้าสู่ระบบ',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    navigate('/admin/dashboard');
                    break;
                case 'sale':
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าสู่ระบบ',
                        text: 'ยินดีต้อนรับเข้าสู่ระบบ',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    navigate('/sale/dashboard');
                    break;
                default:
                    navigate('/');
                    break;
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: "โปรดใส่ email และ password ให้ถูกต้อง",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='hold-transition login-page'>
            <div className="login-box">
                <div className="login-logo">
                    <b>ระบบ</b>จัดการใบเสนอราคา
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">ล็อกอินเพื่อเข้าสู่ระบบ</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={loginData.email}
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
                                    value={loginData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                                </button>
                            </div>
                            <p className="mb-0">
                                <NavLink to="/register" className="text-center">โปรดสมัครก่อนเข้าสู่ระบบ</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
