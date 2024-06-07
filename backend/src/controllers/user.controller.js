const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const searchUserByRole = async (req, res) => {
    try {
        const { role } = req.query;

        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }

        // Search users by role
        const users = await User.find({ role })

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found with this role" });
        }

        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllUsers,
    searchUserByRole
};
