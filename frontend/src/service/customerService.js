import http from './http-common';

const createCustomer = async (customerData) => {
    return http.post('/api/customer/create', customerData)
}

const customerBysaleId = async () => {
    return http.get(`/api/customer/sale`)
}

const customerAll = async () => {
    return http.get('/api/customer/all')
}

const customerById = async (id) => {
    return http.get(`/api/customer/info/${id}`).then((res) => {
        return res;
    });
}

const deleteCustomer = async (id) => {
    return http.delete(`/api/customer/delete/${id.toString()}`)
}

const customerService = {
    createCustomer,
    customerAll,
    customerById,
    deleteCustomer,
    customerBysaleId
}

export default customerService 