import createError from 'http-errors';
import { Types } from 'mongoose';

import Order from '../models/Order.js';
import GenericController from './generic.js';

class OrderController extends GenericController {
    constructor(Model) {
        super(Model);
    }

    delete = async ({ params: { id }, user, res, next }) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const doc = await this.Model.findByIdAndDelete(id);
            if (!doc) throw new createError.NotFound();
            // Auth: Send only for admins or if user in doc matches logged-in user
            if (user.role !== 'admin' && String(doc.user._id) !== user.id) throw new createError.Unauthorized();
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    };

    getAll = async (req, res, next) => {
        try {
            // Handle redirected requests from user controller for user orders
            const query = req.params.id ? { user: req.params.id } : {};
            const docs = await this.Model.find(query)
                .sort('-createdAt')
                .populate({ path: 'user', options: { lean: true, select: 'address email' } })
                .populate({ path: 'items.product', options: { lean: true, select: 'name' } });
            res.status(200).json(docs);
        } catch (err) {
            next(err);
        }
    };

    getOne = async ({ params: { id }, user }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const doc = await this.Model.findById(id)
                .populate({ path: 'user', options: { lean: true, select: 'address email' } })
                .populate({ path: 'items.product', options: { lean: true, select: 'name' } });
            if (!doc) throw new createError.NotFound();
            // Auth: Send only for admins or if user in doc matches logged-in user
            if (user.role !== 'admin' && String(doc.user._id) !== user.id) throw new createError.Unauthorized();
            res.status(200).json(doc);
        } catch (err) {
            next(err);
        }
    };
}

export default new OrderController(Order);
