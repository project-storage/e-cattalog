const customerModel = require('../models/customer.model')

const createCustomer = async (req, res) => {
    try {
        const { title, firstName, lastName, email, tel, address } = req.body

        // ตรวจสอบว่ามีข้อมูลที่จำเป็นทั้งหมดหรือไม่
        if (!title || !firstName || !lastName || !email || !tel || !address) {
            return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบ" });
        }

        // ตรวจสอบเบอร์โทรให้ครบ 10 ตำแหน่ง
        if (tel.length !== 10) {
            return res.status(400).json({ msg: "กรุณากรอกเบอร์โทรให้ครบ 10 ตำแหน่ง" });
        }

        // ตรวจสอบว่าอีเมล์หรือเบอร์โทรนี้ถูกใช้งานแล้วหรือไม่
        const existingEmail = await userModel.findOne({ email });
        const existingTel = await userModel.findOne({ tel });

        if (existingEmail) {
            return res.status(400).json({ msg: "อีเมลนี้ถูกใช้งานแล้ว" });
        }

        if (existingTel) {
            return res.status(400).json({ msg: "เบอร์โทรนี้ถูกใช้งานแล้ว" });
        }

        const newCustomer = await customerModel({
            title,
            firstName,
            lastName,
            email,
            tel,
            address
        })

        await newCustomer.save()

        res.status(201).json({ msg: "Customer created successfully", data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllCustomer = async (req, res) => {
    try {
        const custermers = await customerModel.find({})

        res.status(200).json({ msg: "get all customer success", data: custermers })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerModel.findById(id);

        if (!customer) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        res.status(200).json({ msg: "Customer retrieved successfully", data: customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, firstName, lastName, email, tel, address } = req.body;

        // Validate input
        if (!title || !firstName || !lastName || !email || !tel || !address) {
            return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบ" });
        }

        // Validate phone number length
        if (tel.length !== 10) {
            return res.status(400).json({ msg: "กรุณากรอกเบอร์โทรให้ครบ 10 ตำแหน่ง" });
        }

        const customer = await customerModel.findById(id);
        if (!customer) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        // Update fields
        customer.title = title;
        customer.firstName = firstName;
        customer.lastName = lastName;
        customer.email = email;
        customer.tel = tel;
        customer.address = address;

        await customer.save();

        res.status(200).json({ msg: "Customer updated successfully", data: customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerModel.findById(id);

        if (!customer) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        await customer.remove();

        res.status(200).json({ msg: "Customer deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createCustomer,
    getAllCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}