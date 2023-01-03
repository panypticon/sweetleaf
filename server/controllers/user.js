import User from '../models/User.js';
import extractSchemaErrors from '../utils/extractSchemaErrors.js';

const userController = {
    signUp: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json({ signup: true });
        } catch (err) {
            next(extractSchemaErrors(err));
        }
    }
};

export default userController;
