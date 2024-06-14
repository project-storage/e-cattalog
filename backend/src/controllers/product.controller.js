const { slugify } = require('slugify')
const productModel = require('../models/product.model')
const fs = require('fs')

const createProduct = async (req, res) => {
    try {
        const { name, slug, price, description, category } = req.fields
        const { image } = req.files

        if (!name || !price || !description || !category) {
            return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบ" });
        }

        if (image && image.size > 1000000) {
            return res.status(400).json({ msg: "รูปควรมีขนาดน้อยกว่าหรือเท่ากับ 1 mb" })
        }

        const newProduct = new productModel({ ...req.fields, slug: slugify(name) })

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
        const products = await productModel
            .find({})
            .populate('category')
            .select('-image')
            .limit(12)
            .sort({ createdAt: -1 })

        // console.log(products)
        res.status(200).json({ data: products })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug })
            .select('-image')
            .populate("category")

        res.status(200).send({
            message: "Single Product Fetched",
            data: product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category } = req.fields;
        const { image } = req.files;

        if (!name || !price || !description || !category) {
            return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบ" });
        }

        if (image && image.size > 1000000) {
            return res.status(400).json({ msg: "รูปควรมีขนาดน้อยกว่าหรือเท่ากับ 1 mb" });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, {
            ...req.fields,
            slug: slugify(name),
        }, { new: true });

        if (image) {
            updatedProduct.image.data = fs.readFileSync(image.path);
            updatedProduct.image.contentType = image.type;
        }

        await updatedProduct.save();

        res.status(200).json({
            msg: "Product Updated Successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({
            msg: "Product Deleted Successfully",
            data: deletedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
