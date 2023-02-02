import mongoose from 'mongoose';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import addressSchema from './Address.js';

const sign = promisify(jwt.sign);

const googleUserSchema = new mongoose.Schema(
    {
        address: {
            type: addressSchema,
            default: undefined,
            required: true
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            trim: true
        },
        googleID: {
            type: String,
            required: [true, 'Google ID is required'],
            trim: true
        }
    },
    { timestamps: true }
);

// Generate JWT
googleUserSchema.method('generateToken', async function () {
    return await sign({ id: this._id, type: 'auth' }, process.env.JWT_SECRET, { expiresIn: '7d' });
});

//// Limit sent values
googleUserSchema.set('toJSON', {
    virtuals: true,
    transform: (_, vals) => {
        const { address, email, id } = vals;
        return { address, email, id };
    }
});

const User = mongoose.model('GoogleUser', googleUserSchema, 'users');

export default User;
