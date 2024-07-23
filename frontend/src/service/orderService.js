import http from './http-common'

const createOrder = async (createData) => {
    return http.post(`http://localhost:8080/api/order/create`, createData)

}

const updateOrder = async (id, updateOrder) => {
    return http.put(`http://localhost:8080/api/order/update/${id}`, updateOrder)

}

const orders = async () => {
    return http.get('/api/order/all')
}

const orderById = async (id) => {
    return http.get(`/api/order/info/${id}`).then((res) => {
        return res;
    });
}

const searchProcess = async () => {
    return http.get('http://localhost:8080/api/order/search?status=process')
}

const searchPass = async () => {
    return http.get('http://localhost:8080/api/order/search?status=pass')
}

const searchFail = async () => {
    return http.get('http://localhost:8080/api/order/search?status=fail')
}

const searchToCustomer = async (data) => {
    return http.get(`http://localhost:8080/api/order/search/customer/${data}?status=toCustomer`)
}
const exportService = {
    createOrder,
    orders,
    searchPass,
    searchProcess,
    searchFail,
    orderById,
    updateOrder,
    searchToCustomer
}

export default exportService