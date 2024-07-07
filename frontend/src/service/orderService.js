import http from './http-common'

const createOrder = async (createData) => {
    return http.post(`http://localhost:8080/api/order/create`, createData)

}

const orders = async () => {
    return http.get('/admin/order/all')
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
const exportService = {
    createOrder,
    orders,
    searchPass,
    searchProcess,
    searchFail
}

export default exportService