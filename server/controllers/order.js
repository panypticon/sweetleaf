import { Types } from 'mongoose';

import Order from '../models/Order.js';
import GenericController from './generic.js';

class OrderController extends GenericController {
    constructor(Model) {
        super(Model);
    }

    getAll = async (_, res, next) => {
        try {
            const docs = await this.Model.find()
                .populate({ path: 'user', options: { lean: true, select: 'address email' } })
                .populate({ path: 'items.product', options: { lean: true, select: 'name' } });
            res.status(200).json(docs);
        } catch (err) {
            next(err);
        }
    };

    getOne = async ({ params: { id } }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const doc = await this.Model.findById(id)
                .populate({ path: 'user', options: { lean: true, select: 'address email' } })
                .populate({ path: 'items.product', options: { lean: true, select: 'name' } });
            if (!doc) throw new createError.NotFound();
            res.status(200).json(doc);
        } catch (err) {
            next(err);
        }
    };
}

export default new OrderController(Order);
