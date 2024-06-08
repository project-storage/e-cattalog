import React from 'react'

const Login = () => {
    return (
        <div className='hold-transition login-page'>
            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html"><b>ระบบ</b>จัดการใบเสนอราคา</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">ล็อกอินเพื่อเข้าสู่ระบบ</p>
                        <form action="../../index3.html" method="post">
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" required />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" required />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div >
                                <button type="submit" className="btn btn-primary btn-block">เข้าสู่ระบบ</button>
                            </div>
                            <p class="mb-0">
                                <a class="text-center">โปรดสมัครก่อนเข้าสู่ระบบ</a>
                            </p>
                        </form>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>

    )
}

export default Login