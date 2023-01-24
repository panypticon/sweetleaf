import createError from 'http-errors';
import Product from '../models/Product.js';
import { Types } from 'mongoose';

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
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const product = await Product.findByIdAndDelete(id);
            if (!product) throw new createError.NotFound();
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
    query: async ({ query }, res, next) => {
        try {
            const search = Object.entries(query).reduce((acc, [key, value]) => {
                switch (key) {
                    case 'category':
                    case 'type':
                        return { ...acc, [key]: value };
                    case 'flavored':
                        return {
                            ...acc,
                            [`attributes.${key}`]: value === 'true' ? true : value === 'false' ? false : null
                        };
                    case 'name':
                        return { ...acc, [key]: new RegExp(value, 'i') };
                    case 'origin':
                        return { ...acc, [`attributes.${key}`]: value };
                    case 'taste':
                        return { ...acc, [`attributes.${key}`]: value };
                    case 'taste-all':
                        return { ...acc, ['attributes.taste']: { $all: value.split(',') } };
                    case 'taste-any':
                        return { ...acc, ['attributes.taste']: { $in: value.split(',') } };

                    default:
                        return acc;
                }
            }, {});
            const products = await Product.find(search);
            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },
    getAll: async (_, res, next) => {
        try {
            const products = await Product.find().populate('purchases');
            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },
    getOne: async ({ params: { id } }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const product = await Product.findById(id);
            if (!product) throw new createError.NotFound();
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    },
    update: async ({ params: { id }, body }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
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
