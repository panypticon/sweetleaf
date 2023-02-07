import createError from 'http-errors';
import { Types } from 'mongoose';

import Product from '../models/Product.js';
import GenericController from './generic.js';

const pipeline = [
    {
        $lookup: {
            from: 'ratings',
            localField: '_id',
            foreignField: 'product',
            as: 'ratings.ratings'
        }
    },
    {
        $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'items.product',
            pipeline: [{ $match: { createdAt: { $gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } } }],
            as: 'recentPurchases.purchases'
        }
    },
    {
        $addFields: {
            'recentPurchases.count': { $size: '$recentPurchases.purchases' },
            'ratings.count': { $size: '$ratings.ratings' },
            'ratings.average': {
                $function: {
                    args: ['$ratings.ratings'],
                    lang: 'js',
                    body: function (ratings) {
                        return ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length || 0;
                    }
                }
            }
        }
    }
];

class ProductController extends GenericController {
    constructor(Model) {
        super(Model);
    }

    getAll = async (_, res, next) => {
        try {
            const docs = await this.Model.aggregate(pipeline).then(docs => docs.map(doc => this.Model.hydrate(doc)));
            res.status(200).json(docs);
        } catch (err) {
            next(err);
        }
    };

    getAllstars = async (_, res, next) => {
        try {
            const docs = await this.Model.aggregate(pipeline).then(docs =>
                docs
                    .map(doc => this.Model.hydrate(doc))
                    .filter(doc => doc.new || doc.ratings.average >= 4.5 || doc.recentPurchases > 50)
                    .slice(0, 12)
            );
            res.status(200).json(docs);
        } catch (err) {
            next(err);
        }
    };

    getOne = async ({ params: { id } }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const doc = await this.Model.aggregate([{ $match: { _id: Types.ObjectId(id) } }, ...pipeline]).then(docs =>
                docs.map(doc => this.Model.hydrate(doc))
            );
            if (doc.length < 1) throw new createError.NotFound();
            res.status(200).json(doc[0]);
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
            const docs = await this.Model.aggregate([{ $match: search }, ...pipeline]).then(docs =>
                docs.map(doc => this.Model.hydrate(doc))
            );
            res.status(200).json(docs);
        } catch (err) {
            next(err);
        }
    };
}

export default new ProductController(Product);
