import { Schema, Types } from 'mongoose';
import createError from 'http-errors';

class GenericController {
    constructor(Model) {
        this.Model = Model;
    }

    add = async (req, res, next) => {
        try {
            const newDoc = new this.Model(req.body);
            await newDoc.save();
            res.status(201).json(newDoc);
        } catch (err) {
            next(err);
        }
    };

    delete = async ({ params: { id }, res, next }) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const doc = await this.Model.findByIdAndDelete(id);
            if (!doc) throw new createError.NotFound();
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    };

    getAll = async (_, res, next) => {
        try {
            const docs = await this.Model.find();
            res.status(200).json(docs);
        } catch (err) {
            next(err);
        }
    };

    getOne = async ({ params: { id } }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const doc = await this.Model.findById(id);
            if (!doc) throw new createError.NotFound();
            res.status(200).json(doc);
        } catch (err) {
            next(err);
        }
    };

    update = async ({ params: { id }, body }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const doc = await this.Model.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true
            });
            if (!doc) throw new createError.NotFound();
            res.status(200).json(doc);
        } catch (err) {
            next(err);
        }
    };
}

export default GenericController;
