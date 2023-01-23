import createError from 'http-errors';
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
    delete: async ({ params: { id }, res, next }) => {
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) throw new createError.NotFound();
            res.status(204).send();
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
    },
    getOne: async ({ params: { id } }, res, next) => {
        try {
            const product = await Product.findById(id);
            if (!product) throw new createError.NotFound();
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    },
    update: async ({ params: { id }, body }, res, next) => {
        try {
            const product = await Product.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true
            });
            if (!product) throw new createError.NotFound();
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }
};

export default productController;
