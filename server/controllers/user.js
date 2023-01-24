import createError from 'http-errors';
import { Types } from 'mongoose';

import User from '../models/User.js';

const userController = {
    delete: async ({ params: { id }, res, next }) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const user = await User.findByIdAndDelete(id);
            if (!user) throw new createError.NotFound();
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
    getAll: async (_, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    },
    getOne: async ({ params: { id } }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const user = await User.findById(id);
            if (!user) throw new createError.NotFound();
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
    logIn:
        (isThirdParty = false) =>
        async (req, res) => {
            const token = await req.user.generateToken();
            const loginDuration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            if (!isThirdParty)
                res.status(200)
                    .cookie('auth', token, {
                        httpOnly: true,
                        expires: loginDuration,
                        secure: process.env.NODE_ENV !== 'development'
                    })
                    .json(req.user);
            else
                res.cookie('auth', token, {
                    httpOnly: true,
                    expires: loginDuration,
                    secure: process.env.NODE_ENV !== 'development'
                }).redirect('/');
        },
    signUp: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    },
    update: async ({ params: { id }, body }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
            if (!user) throw new createError.NotFound();
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
};

export default userController;
