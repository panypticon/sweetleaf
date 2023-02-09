import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import GoogleStrategy from 'passport-google-oauth20';
import createError from 'http-errors';
import 'dotenv/config';

import User from '../models/User.js';
import GoogleUser from '../models/GoogleUser.js';

const { JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NODE_ENV } = process.env;

passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email, password: { $exists: true } });
            if (!user) throw new createError.Unauthorized();
            const passwordsMatch = await user.authenticate(password);
            if (!passwordsMatch) throw new createError.Unauthorized();
            if (!user.role === 'admin' && !user.emailVerified) throw new createError.Conflict();
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(
    new JWTStrategy(
        {
            secretOrKey: JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([
                req => {
                    if (!req.cookies.auth) throw new createError.Unauthorized();
                    return req.cookies.auth;
                }
            ])
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.id);
                if (!user) throw new createError.Unauthorized();
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: `${
                NODE_ENV === 'development' ? 'http://localhost:3000' : `https://sweetleaf.vercel.app`
            }/api/v1/users/login/google/redirect`,
            scope: ['profile', 'email'],
            state: false
        },
        async (req, _accessToken, _refreshToken, { id, name, emails }, done) => {
            try {
                const user = await GoogleUser.findOne({ googleID: id });
                if (user) return done(null, user);
                else {
                    const newUser = new GoogleUser({
                        address: {
                            firstName: name.givenName || 'J.',
                            lastName: name.familyName || 'Doe'
                        },
                        email: emails[0].value,
                        googleID: id
                    });
                    await newUser.save();
                    return done(null, newUser);
                }
            } catch (err) {
                return done(err);
            }
        }
    )
);

export const authLocal = passport.authenticate('local', { session: false });
export const isLoggedIn = passport.authenticate('jwt', { session: false });
export const authGoogle = passport.authenticate('google', { session: false });

export const isAdmin = [
    isLoggedIn,
    (req, _, next) => {
        if (req.user.role === 'admin') next();
        else next(createError.Unauthorized());
    }
];

export const isUserOrAdmin = [
    isLoggedIn,
    (req, _, next) => {
        if (req.user.role === 'admin' || req.params.id === req.user.id) next();
        else next(createError.Unauthorized());
    }
];

export const isEmbeddedUserOrAdmin = [
    isLoggedIn,
    (req, _, next) => {
        if (req.user.role === 'admin' || req.body.user === req.user.id) next();
        else next(createError.Unauthorized());
    }
];
