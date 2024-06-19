import React, { useState, useEffect } from 'react';
import categoriesService from '../../../../service/categoriesService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate()

    const fetchCategories = async () => {
        try {
            const res = await categoriesService.categories();
            setCategories(res.data.data);
        } catch (error) {
            setError("An error occurred while fetching categories.");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name || !price || !description || !category || !image) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("image", image);

            const { data } = await axios.post(
                'http://localhost:8080/api/product/create',
                productData
            );

            if (data.success) {
                setSuccess("Product created successfully!");
                setName("");
                setPrice("");
                setDescription("");
                setImage(null);
                setCategory("");
            } else {
                setError("An error occurred while creating the product.");
            }
        } catch (error) {
            setError("An error occurred while creating the product.");
        }
    };

    const handleCancel = async () => {
        navigate('/admin/products')
    }
    return (
        <div className='form-create-product'>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <div className="form-row">
                    <div className="form-group col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            id="inputNameProduct"
                            placeholder="ชื่อสินค้า"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <input
                            type="number"
                            className="form-control"
                            id="inputPrice"
                            placeholder="ราคา"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <select
                        className="custom-select custom-select-lg"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">เลือกประเภทสินค้า</option>
                        {categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="inputDescription"
                        placeholder="รายละเอียดสินค้า"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="btn btn-secondary cursor col-md-12">
                        {image ? image.name : "อัพโหลดรูปภาพ"}
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            hidden
                        />
                    </label>
                </div>
                <div className="mb-3">
                    {image && (
                        <div className="text-center">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="product_image"
                                height={"200px"}
                                className="img img-responsive"
                            />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-danger mx-1" onClick={handleCancel}>ยกเลิก</button>
                <button type="submit" className="btn btn-primary">เพิ่มสินค้า</button>
            </form>
        </div>
    );
};

export default CreateProduct;
