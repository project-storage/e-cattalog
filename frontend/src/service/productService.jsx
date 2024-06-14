import http from './http-common'

const getallProduct = async () => {
    return http.get(`/api/product/all`)
}

const productService = {
    getallProduct
}

export default productService