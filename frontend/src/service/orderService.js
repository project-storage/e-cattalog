import http from './http-common'

const createOrder = async (createData) => {
    return http.post(`http://localhost:8080/api/order/create`,createData)

}

const exportService = {
    createOrder
}

export default exportService