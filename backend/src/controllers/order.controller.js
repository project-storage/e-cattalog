const orderModel = require('../models/order.model');

const createOrder = async (req, res) => {
    const { estNo, customer, products, date, totalPrice, project } = req.body;
    const sale = req.user._id
    try {

        // Check if an order with the same estNo already exists
        const existsEstNo = await orderModel.findOne({ estNo });
        if (existsEstNo) {
            return res.status(400).json({ message: "Order with this estimate number already exists" });
        }

        const newOrder = new orderModel({
            estNo,
            customer,
            products,
            sale,
            totalPrice,
            status: "process",
            project,
            date: date ? new Date(date) : Date.now()
        });

        await newOrder.save();

        // console.log(newOrder)
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
        const orders = await orderModel.find()
            .populate('customer')
            .populate({
                path: 'products.product',
                populate: {
                    path: 'category'
                },
                select: '-image'
            })
            .populate('sale');

        res.status(200).json({
            msg: "Orders Retrieved Successfully",
            data: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const searchByCustomer = async (req, res) => {
    try {
        const { status } = req.query
        const { customer } = req.params

        const orderByCustomer = await orderModel.find({ status, customer })
            .populate('customer')
            .populate({
                path: 'products.product',
                populate: {
                    path: 'category'
                }
            })
            .populate('sale');
        if (!orderByCustomer || orderByCustomer.length === 0) {
            return res.status(404).json({ message: "No order found with this status" });
        }

        // Respond with the found orders
        res.status(200).json({ data: orderByCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const searchStatus = async (req, res) => {
    try {
        const { status } = req.query;

        // Fetch orders by status and populate the related fields
        const orderByStatus = await orderModel.find({ status })
            .populate('customer')
            .populate({
                path: 'products.product',
                populate: {
                    path: 'category'
                },
                select: '-image'
            })
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

const searchOrderBySale = async (req, res) => {
    try {
        const { status } = req.query
        const query = { sale: req.user._id };

        if (status) {
            query.status = status;
        }
        const orderBySale = await orderModel.find(query)
            .populate('customer')
            // .populate({
            //     path: 'products.product',
            //     populate: {
            //         path: 'category'
            //     }
            // })
            .populate('sale');

        if (!orderBySale || orderBySale.length === 0) {
            return res.status(404).json({ message: "No order found with this status" });
        }

        return res.status(200).json({ data: orderBySale })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getOrderNew = async (req, res) => {
    try {
        const getOrder = await orderModel.find().sort({ date: -1 }).limit(1)

        return res.status(200).json({ data: getOrder })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderModel.findById(id)
            .populate('customer')
            .populate({
                path: 'products.product',
                populate: {
                    path: 'category'
                },
                select: '-image'
            })
            .populate('sale')


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
    const { estNo, customer, products, sale, date, status, comment } = req.body;

    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(id, {
            estNo,
            customer,
            products,
            sale,
            status,
            comment,
            date: date ? new Date(date) : Date.now()
        }, { new: true })

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
    searchStatus,
    createOrder,
    getAllOrders,
    getOrderNew,
    getOrderById,
    updateOrder,
    deleteOrder,
    searchByCustomer,
    searchOrderBySale
};
