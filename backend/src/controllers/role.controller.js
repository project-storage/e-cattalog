const Role = require('../models/role.model');

// สร้างบทบาทใหม่
const createRole = async (req, res) => {
    try {
        const { roleName } = req.body;

        if (!roleName) {
            return res.status(400).json({ message: "Role name is required" });
        }

        // ตรวจสอบว่าบทบาทนี้มีอยู่แล้วหรือไม่
        const existingRole = await Role.findOne({ roleName });

        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }

        // สร้างบทบาทใหม่
        const newRole = new Role({ roleName });
        await newRole.save();

        res.status(201).json({ message: "Role created successfully", role: newRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// อัปเดตบทบาท
const updateRole = async (req, res) => {
    try {
        const { roleName } = req.body;

        if (!roleName) {
            return res.status(400).json({ message: "Role name is required" });
        }

        // อัปเดตบทบาท
        const updatedRole = await Role.findOneAndUpdate(
            { _id: req.params.id },
            { roleName },
            { new: true }
        );

        res.status(200).json({ message: "Role updated successfully", role: updatedRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ลบบทบาท
const deleteRole = async (req, res) => {
    try {
        // ลบบทบาท
        await Role.findOneAndDelete({ _id: req.params.id });

        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// เรียกดูบทบาททั้งหมด
const getAllRoles = async (req, res) => {
    try {
        // เรียกดูบทบาททั้งหมด
        const roles = await Role.find();

        res.status(200).json({ roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createRole,
    updateRole,
    deleteRole,
    getAllRoles
};
