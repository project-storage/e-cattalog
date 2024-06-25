import http from './http-common';

const createCustomer = async (customerData) => {
    return http.post('/api/customer/create', customerData)
}

const customerAll = async () => {
    return http.get('/api/customer/all')
}

const deleteCustomer = async (id) => {
    return http.delete(`/api/customer/delete/${id.toString()}`)
}

const customerService = {
    createCustomer,
    customerAll,
    deleteCustomer
}

export default customerService 