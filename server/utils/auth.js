import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import createError from 'http-errors';
import 'dotenv/config';

import User from '../models/User.js';

passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) throw createError.Unauthorized();
            const passwordsMatch = await user.authenticate(password);
            if (!passwordsMatch) throw createError.Unauthorized();
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([
                req => {
                    if (!req.cookies.auth) throw createError.Unauthorized();
                    return req.cookies.auth;
                }
            ])
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.id);
                if (!user) throw createError.Unauthorized();
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

export const authLocal = passport.authenticate('local', { session: false });
export const authJWT = passport.authenticate('jwt', { session: false });
