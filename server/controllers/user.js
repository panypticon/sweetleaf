import User from '../models/User.js';

const userController = {
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
    }
};

export default userController;
