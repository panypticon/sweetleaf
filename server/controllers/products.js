import Product from '../models/Product.js';

const productController = {
    add: async (req, res, next) => {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (err) {
            next(err);
        }
    },
    getAll: async (_, res, next) => {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    }
};

export default productController;
