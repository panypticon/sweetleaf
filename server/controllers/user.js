import { promisify } from 'util';
import { Types } from 'mongoose';
import createError from 'http-errors';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/User.js';
import GenericController from './generic.js';

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const { NODE_ENV, SENDGRID_API_KEY, JWT_SECRET } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

class UserController extends GenericController {
    constructor(Model) {
        super(Model);
    }

    add = async (req, res, next) => {
        try {
            const emailToken = await signJWT({ email: req.body.email, type: 'email' }, JWT_SECRET, {
                expiresIn: '30d'
            });
            const data = { ...req.body, emailVerified: false, emailToken };
            const newDoc = new this.Model(data);
            await newDoc.save();
            await sgMail.send({
                to: req.body.email,
                from: 'megalo@gmx.net',
                subject: 'Hi from Leaflet – please verify your email',
                text: `Hi ${req.body.address.firstName},
                
                In order to use Leaflet, please verify your email by clicking the following link. You can then log in and enjoy your tea:
                
                ${
                    NODE_ENV === 'development' ? 'http://localhost:3000' : `https://sweetleaf.vercel.app`
                }/verifyemail?emailToken=${emailToken}
                
                Best,
                
                Team Leaflet`,
                html: `<p>Hi ${req.body.address.firstName},</p>
                
                <p>In order to use Leaflet, please verify your email by clicking the link below. You can then log in and enjoy your tea:</p>
                
                <a href="${
                    NODE_ENV === 'development' ? 'http://localhost:3000' : `https://sweetleaf.vercel.app`
                }/verifyemail?emailToken=${emailToken}">Verify email</a>
                
                <p>Best,</p>
                <p>Team Leaflet</p>`
            });
            res.status(201).json(newDoc);
        } catch (err) {
            next(err);
        }
    };

    saveGoogleRedirectURL = [
        (req, _, next) => {
            if (req.query.route) req.session.route = req.query.route;
            else req.session.destroy();
            next();
        }
    ];

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
                        secure: NODE_ENV !== 'development'
                    })
                    .cookie('login', req.user.id, {
                        expires: loginDuration,
                        secure: NODE_ENV !== 'development'
                    })
                    .json(req.user);
            else {
                const route = req.session?.route;
                req.session && req.session.destroy();
                res.status(200)
                    .cookie('auth', token, {
                        httpOnly: true,
                        expires: loginDuration,
                        secure: NODE_ENV !== 'development'
                    })
                    .cookie('login', req.user.id, {
                        expires: loginDuration,
                        secure: NODE_ENV !== 'development'
                    })
                    .redirect(route || '/');
            }
        };

    logOut = (_, res) => res.status(200).clearCookie('auth').clearCookie('login').send();

    update = async ({ params: { id }, body }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            // Make sure email verification can't be changed via API
            if (body.emailVerified || body.emailToken) throw new createError.Unauthorized();
            // Make sure password can only be changed via updatePassword controller
            if (body.password) delete body.password;
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

    updatePassword = async ({ params: { id }, body: { currentPassword, newPassword } }, res, next) => {
        try {
            if (!Types.ObjectId.isValid(id)) throw new createError.NotFound();
            // Get user and compare old password
            const user = await User.findById(id);
            if (!user) throw new createError.Unauthorized();
            const currentPasswordMatches = await user.authenticate(currentPassword);
            if (!currentPasswordMatches) throw new createError.Unauthorized();
            // Make sure new password differs
            if (currentPassword === newPassword) throw new createError.Conflict();
            // Save and encrypt new pasword
            user.password = await user.encrypt(newPassword);
            await user.save();
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    };

    verifyemail = async ({ query: { emailToken } }, res, next) => {
        try {
            if (!emailToken) throw new createError.Unauthorized();
            const { email } = await verifyJWT(emailToken, JWT_SECRET);
            const user = await User.findOne({ email });
            if (!user || user.email !== email) throw new createError.Unauthorized();
            user.emailVerified = true;
            await user.save();
            res.redirect('/verified');
        } catch (err) {
            next(err);
        }
    };
}

export default new UserController(User);
