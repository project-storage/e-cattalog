import React, { useState } from 'react';
import categoriesService from '../../../../service/categoriesService';

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const create = await categoriesService.createCategory({ name });

      if (create.status === 201) {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'เพิ่มอมูลสำเร็จ!',
        //   text: 'Category created successfully.',
        //   timer: 1000,
        //   timerProgressBar: true,
        //   showConfirmButton: false,
        // });
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Ensure the correct key "message"
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className='form-create-category'>
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
        <button type="submit" className="btn btn-primary mb-2">เพิ่มข้อมูล</button>
      </form>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default CreateCategory;
