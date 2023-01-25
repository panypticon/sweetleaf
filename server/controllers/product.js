import createError from 'http-errors';
import Product from '../models/Product.js';
import { Types } from 'mongoose';

import GenericController from './generic.js';

class ProductController extends GenericController {
    constructor(Model) {
        super(Model);
    }

    getAll = async (_, res, next) => {
        try {
            const docs = await Product.find().populate('purchases');
            res.status(200).json(docs);
        } catch (err) {
            next(err);
        }
    };

    getOne = async ({ params: { id } }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const doc = await this.Model.findById(id).populate('purchases');
            if (!doc) throw new createError.NotFound();
            res.status(200).json(doc);
        } catch (err) {
            next(err);
        }
    };

    query = async ({ query }, res, next) => {
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
            const docs = await Product.find(search);
            res.status(200).json(docs);
        } catch (err) {
            next(err);
        }
    };
}

export default new ProductController(Product);
