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

const newOrde = async () => {
    return http.get('/api/order/new')
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

const searchToCustomer = async () => {
    return http.get('http://localhost:8080/api/order/search?status=toCustomer')
}

const searchFail = async () => {
    return http.get('http://localhost:8080/api/order/search?status=fail')
}

const searchOrderHistory = async()=>{
    return http.get('http://localhost:8080/api/order/search/sale/status?status=toCustomer')
}

const searchOrderHistoryPass = async()=>{
    return http.get('http://localhost:8080/api/order/search/sale/status?status=pass')
}

const searchOrderHistoryProcess = async()=>{
    return http.get('http://localhost:8080/api/order/search/sale/status?status=process')
}

const searchOrderHistoryFail = async()=>{
    return http.get('http://localhost:8080/api/order/search/sale/status?status=fail')
}
const searchOrderBySale = async ()=>{
    return http.get('http://localhost:8080/api/order/search/sale/status')
}

const exportService = {
    createOrder,
    orders,
    newOrde,
    searchPass,
    searchProcess,
    searchFail,
    searchToCustomer,
    orderById,
    updateOrder,
    searchOrderHistory,
    searchOrderHistoryPass,
    searchOrderHistoryProcess,
    searchOrderHistoryFail,
    searchOrderBySale
}

export default exportService