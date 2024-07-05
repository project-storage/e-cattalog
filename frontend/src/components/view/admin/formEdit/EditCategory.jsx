import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import categoriesService from '../../../../service/categoriesService';
import Swal from 'sweetalert2';

const EditCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams(); // ensure useParams is imported and used correctly
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const res = await categoriesService.getCategoryById(id);
            // console.log("Fetch response:", res);

            if (res.status === 200) {
                setName(res.data.data.name);
            } else {
                setError('Error fetching category data');
            }
        } catch (error) {
            console.error("Error fetching category data:", error);
            setError('Error fetching category data');
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await categoriesService.updateCategory(id, { name });
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Category updated successfully.',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                },
                    window.location.reload()
                );
            } else {
                setError('Error updating category');
            }
        } catch (error) {
            console.error("Error updating category:", error);
            setError('Error updating category');
        }
    };

    return (
        <div className='form-update-category'>
            <form className="form-inline justify-content-center" onSubmit={handleSubmit}>
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="inputCategory" className="sr-only">ประเภทสินค้า</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCategory"
                        placeholder="ประเภทสินค้า"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2">แก้ไขข้อมูล</button>
            </form>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
    );
};

export default EditCategory;
