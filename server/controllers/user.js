import User from '../models/User.js';
import GenericController from './generic.js';

class UserController extends GenericController {
    constructor(Model) {
        super(Model);
    }

    logIn =
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
        };
}

export default new UserController(User);
