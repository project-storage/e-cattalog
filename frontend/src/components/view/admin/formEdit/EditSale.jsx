import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../../../../service/userService';
import Swal from 'sweetalert2';

const EditSale = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchSale = async () => {
        try {
            const res = await userService.userById(id);
            console.log(res)
            if (res.status === 200) {
                const user = res.data.data;
                setTitle(user.title);
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setTel(user.tel);
            } else {
                setError('Error fetching sale data');
            }
            
        } catch (error) {
            setError('Error fetching sale data');
        }
    };

    useEffect(() => {
        fetchSale();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password && password !== confirmPassword) {
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
            const updatedSale = {
                title,
                firstName,
                lastName,
                email,
                tel,
                ...(password && { password })  // Only include password if it's provided
            };

            const update = await userService.updateUser(id, updatedSale);
            if (update.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'User updated successfully.',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                }).then(() => {
                    navigate('/admin/sales');
                });
            } else {
                setError('Error updating user');
            }
        } catch (error) {
            setError('Error updating user');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/sales');
    };

    return (
        <div className='form-update-user'>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <select
                            className="form-control"
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
                            type="tel"
                            className="form-control"
                            name="tel"
                            placeholder="Telephone"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                    <div className="form-group col-md-6">
                        <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditSale;
