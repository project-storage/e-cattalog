const userModel = require('../models/user.model');

// Get user info by token
const getUserInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({ role: 'sale' }).select('-admin');
        res.status(200).json({ data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Search users by role
const searchUserByRole = async (req, res) => {
    try {
        const { role } = req.query;

        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }

        const users = await userModel.find({ role });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found with this role" });
        }

        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await userModel.findByIdAndUpdate(id, updates, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getUserInfo,
    getAllUsers,
    searchUserByRole,
    getUserById,
    updateUser,
    deleteUser,
};
