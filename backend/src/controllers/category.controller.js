const categoryModel = require('../models/category.model')
const slugify = require('slugify')

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
        }

        const existingName = await categoryModel.findOne({ name });

        if (existingName) {
            return res.status(400).json({ message: "มีประเภทสินค้านี้อยู่แล้ว" });
        }

        const newCategory = new categoryModel({
            name,
            slug: slugify(name),
        });

        await newCategory.save();

        res.status(201).json({ message: "Category created successfully", data: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// ฟังก์ชันสำหรับดึงหมวดหมู่ทั้งหมด
const getAllCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find();

        res.status(200).json({ data: categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const getCateoryById = async (req, res) => {
    try {
        const { id } = req.params
        const queryById = await categoryModel.findById(id)

        res.status(200).json({ msg: "get by slingle category success", data: queryById })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
// ฟังก์ชันสำหรับอัปเดตหมวดหมู่
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบ" });
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ msg: "ไม่พบหมวดหมู่ที่ต้องการอัปเดต" });
        }

        res.status(200).json({ msg: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// ฟังก์ชันสำหรับลบหมวดหมู่
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await categoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ msg: "ไม่พบหมวดหมู่ที่ต้องการลบ" });
        }

        res.status(200).json({ msg: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    getCateoryById,
    updateCategory,
    deleteCategory
}
