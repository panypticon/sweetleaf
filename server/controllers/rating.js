import { Types } from 'mongoose';

import GenericController from './generic.js';
import Rating from '../models/Rating.js';

class RatingController extends GenericController {
    constructor(Model) {
        super(Model);
    }

    getAll = async (req, res, next) => {
        try {
            // Handle redirected requests from product controller for product ratings
            const query = req.params.id ? { product: req.params.id } : {};
            const docs = await this.Model.find(query)
                .populate({ path: 'user', options: { lean: true, select: 'address.firstName address.lastName' } })
                .populate({ path: 'product', options: { lean: true, select: 'name type category attributes' } });
            res.status(200).json(docs);
        } catch (err) {
            next(err);
        }
    };

    getOne = async ({ params: { id } }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const doc = await this.Model.findById(id)
                .populate({ path: 'user', options: { lean: true, select: 'address.firstName address.lastName' } })
                .populate({ path: 'product', options: { lean: true, select: 'name type category attributes' } });
            if (!doc) throw new createError.NotFound();
            res.status(200).json(doc);
        } catch (err) {
            next(err);
        }
    };
}

export default new RatingController(Rating);
