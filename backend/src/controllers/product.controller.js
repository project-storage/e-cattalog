const productModel = require('../models/product.model')
const fs = require('fs')

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.fields
        const { image } = req.files

        if (!name || !price || !description || !category) {
            return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบ" });
        }

        if (image && image.size > 1000000) {
            return res.status(400).json({ msg: "รูปควรมีขนาดน้อยกว่าหรือเท่ากับ 1 mb" })
        }

        const newProduct = new productModel({ ...req.fields })

        if (image) {
            newProduct.image.data = fs.readFileSync(image.path)
            newProduct.image.contentType = image.type
        }
        await newProduct.save()

        res.status(201).json({
            msg: "Product Create Successfully",
            data: newProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find().populate('category').select('-image').limit(12).sort({createdAt: -1})

        // console.log(products)
        res.status(200).json({data:products})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    createProduct,
    getAllProduct
}