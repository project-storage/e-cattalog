import http from './http-common';

const getAllProduct = async () => {
    return http.get(`/api/product/all`)
}

const getByImage = async (id) => {
    return http.get(`/api/product/image/${id}`)
}

const createProduct = async (productData) => {
    return http.post('/api/product/create', productData)
}

const deleteProduct = async (id) => {
    return http.delete(`/api/product/delete/${id.toString()}`)
}

const getProductById = async (id) => {
    return http.get(`/api/product/info/${id}`).then((res) => {
        return res;
    });
}

const updateProduct = async (id, updateProduct) => {
    return http.put(`/api/product/update/${id}`, updateProduct)
}
const productService = {
    getAllProduct,
    getByImage,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById
}

export default productService