const orderModel = require('../models/order.model');

const createOrder = async (req, res) => {
    const { customer, products, date, totalPrice } = req.body;
    const sale = req.user._id
    try {
        const newOrder = new orderModel({
            customer,
            products,
            sale,
            totalPrice,
            status: "process",
            date: date ? new Date(date) : Date.now()
        });

        await newOrder.save();

        console.log(newOrder)
        res.status(201).json({
            msg: "Order Created Successfully",
            data: newOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('customer').populate('products.product').populate('sale');
        res.status(200).json({
            msg: "Orders Retrieved Successfully",
            data: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const searchStatus = async (req, res) => {
    try {
        const { status } = req.query;

        // Fetch orders by status and populate the related fields
        const orderByStatus = await orderModel.find({ status })
            .populate('customer')
            .populate('products.product')
            .populate('sale'); // Ensure 'sale' is the correct field name and is properly referenced

        // Check if any orders were found
        if (!orderByStatus || orderByStatus.length === 0) {
            return res.status(404).json({ message: "No order found with this status" });
        }

        // Respond with the found orders
        res.status(200).json({ data: orderByStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = searchStatus;


const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderModel.findById(id).populate('customer').populate('products.product').populate('sale');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            msg: "Order Retrieved Successfully",
            data: order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { customer, products, sale, date } = req.body;

    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(id, {
            customer,
            products,
            sale,
            date: date ? new Date(date) : Date.now()
        }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            msg: "Order Updated Successfully",
            data: updatedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await orderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            msg: "Order Deleted Successfully",
            data: deletedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    searchStatus
};
