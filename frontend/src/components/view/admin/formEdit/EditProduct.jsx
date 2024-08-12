import React, { useEffect, useState } from 'react';
import productService from '../../../../service/productService';
import categoriesService from '../../../../service/categoriesService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await productService.getProductById(id);

      if (res.status === 200) {
        const product = res.data.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category._id); // Assuming category is fetched with product
      } else {
        setError('Error fetching product data');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError('Error fetching product data');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoriesService.categories();
      setCategories(res.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchCategories();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData to send with image file
    const updateProduct = new FormData();
    updateProduct.append('name', name);
    updateProduct.append('price', price);
    updateProduct.append('description', description);
    updateProduct.append('category', category);
    if (image) {
      updateProduct.append('image', image);
    }

    try {
      const { data } = await axios.put(`http://localhost:8080/api/product/update/${id}`, updateProduct);

      if (data?.success) {
        setError('Faile updating product.');
        setSuccess('');
      } else {
        setSuccess("Product updated successfully!");

        Swal.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จ!',
          text: 'Product updated successfully.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        navigate('/admin/products')
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Error updating product.');
      setSuccess('');
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <div className='form-update-product'>
      <form onSubmit={handleSubmit}>
        {error && <div className='alert alert-danger'>{error}</div>}
        {success && <div className='alert alert-success'>{success}</div>}
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <input
              type='text'
              className='form-control'
              id='inputNameProduct'
              placeholder='ชื่อสินค้า'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group col-md-6'>
            <input
              type='number'
              className='form-control'
              id='inputPrice'
              placeholder='ราคา'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className='form-group'>
          <select
            className='custom-select custom-select-lg'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>เลือกประเภทสินค้า</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='inputDescription'
            placeholder='รายละเอียดสินค้า'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label className='btn btn-secondary cursor col-md-12'>
            {image ? image.name : 'อัพโหลดรูปภาพ'}
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
          </label>
        </div>
        <div className='mb-3'>
          {image ? (
            <div className='text-center'>
              <img
                src={URL.createObjectURL(image)}
                alt='product_image'
                height={'200px'}
                className='img img-responsive'
              />
            </div>
          ) : (
            <div className='text-center'>
              <img
                src={`http://localhost:8080/api/product/image/${id}`}
                alt='product_image'
                height={'200px'}
                className='img img-responsive'
              />
            </div>
          )}
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

export default EditProduct;
