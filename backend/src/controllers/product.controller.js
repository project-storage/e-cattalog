const Product = require('../models/product.model')

const insertProduct = async (req,res) => {
    try {
        const {productName,
                price,
                description,
                type,
        } = req.body

        const image = "imageForProduct"
        await Product.create({
            productName,
            description,
            price,
            type,
            image
        })
        return res.status(201).json('เพิ่มข้อมูลเสร็จสิ้น')
    } catch (error) {
        console.log(error)
        return res.status(500).json('เกิดข้อผิดพลาดทางเทคกะนิก')
    }
}

const getAllProduct = async (req,res) => {
    try {
        const Data = await Product.find()
        return res.status(200).json({Data})
    } catch (error) {
        console.log(error)
        return res.status(500).json('เกิดข้อผิดพลาดทางเทคกะนิก')
    }
}

module.exports = {
    insertProduct,
    getAllProduct
}