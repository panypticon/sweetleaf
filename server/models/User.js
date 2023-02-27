import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import isUUID from 'validator/lib/isUUID.js';
import { hash, compare } from 'bcrypt';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import addressSchema from './Address.js';

const sign = promisify(jwt.sign);

const userSchema = new Schema(
    {
        address: {
            type: addressSchema,
            default: undefined,
            required: true
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique: [true, 'Email address already registered'],
            trim: true,
            validate: {
                validator: val => isEmail(val),
                message: 'Not a valid email address'
            },
            maxlength: [256, 'Email address is too long']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
            match: [
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                'Password must be 8+ characters long and must include upper- and lower-case letters, numbers, and special characters'
            ],
            maxlength: [256, 'Password is too long']
        },
        role: {
            type: String,
            enum: {
                values: ['admin', 'user'],
                message: 'Invalid role'
            },
            default: 'user'
        },
        emailToken: {
            type: String,
            required: true,
            trim: true
        },
        emailVerified: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

//// Hooks
// Save: Encrypt password and set default role to 'user'
userSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.password = await hash(this.password, 12);
        this.role = 'user';
    }
    next();
});
// Update: Encrypt password, if a new one is set, and make sure user roles can't be escalated or emailTokens changed
userSchema.pre('findOneAndUpdate', async function (next) {
    if (this._update.password) this._update.password = await hash(this._update.password, 12);
    delete this._update.role;
    delete this._update.emailToken;
    next();
});

//// Encrypt password
userSchema.method('encrypt', async function (newPassword) {
    return await hash(newPassword, 12);
});

//// Authenticate password
userSchema.method('authenticate', async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
});

// Generate JWT
userSchema.method('generateToken', async function () {
    return await sign({ id: this._id, type: 'auth' }, process.env.JWT_SECRET, { expiresIn: '7d' });
});

//// Limit sent values
userSchema.set('toJSON', {
    virtuals: true,
    transform: (_, vals) => {
        const { address, email, id, googleID } = vals;
        const values = { address, email, id };
        if (googleID) values.googleID = googleID;
        return values;
    }
});

const User = model('User', userSchema, 'users');

export default User;
