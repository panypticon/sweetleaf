import User from '../models/User.js';

const userController = {
    signUp: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    }
};

export default userController;
