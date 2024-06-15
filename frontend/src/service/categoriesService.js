import http from './http-common';

const createCategory = (categoryData) => {
    return http.post('/api/category/create', categoryData);
};

const updateCategory = (id, updateCategory) => {
    return http.put(`/api/category/update/${id}`, updateCategory);
};

const categories = () => {
    return http.get('/api/category/all');
};

const getCategoryById = (id) => {
    return http.get(`/api/category/info/${id}`).then((res) => {
        return res;
    });
};

const deleteCategory = (id) => {
    return http.delete(`/api/category/delete/${id.toString()}`);
};

const categoriesService = {
    createCategory,
    categories,
    deleteCategory,
    getCategoryById,
    updateCategory
};

export default categoriesService;
