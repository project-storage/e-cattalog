import http from './http-common';

const createCustomer = async (customerData) => {
    return http.post('/api/customer/create', customerData)
}

const customerService = {
    createCustomer
}

export default customerService 