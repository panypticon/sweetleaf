import Order from '../models/Order.js';

const orderController = {
    add: async (req, res, next) => {
        try {
            const newOrder = new Order(req.body);
            await newOrder.save();
            res.status(201).json(newOrder);
        } catch (err) {
            next(err);
        }
    },
    getAll: async (_, res, next) => {
        try {
            const orders = await Order.find()
                .populate({ path: 'user', options: { lean: true, select: 'address email' } })
                .populate({ path: 'items.product', options: { lean: true, select: 'name' } });
            res.status(200).json(orders);
        } catch (err) {
            next(err);
        }
    }
};

export default orderController;
