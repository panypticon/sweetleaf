import mongoose from 'mongoose';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

const sign = promisify(jwt.sign);

const googleUserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true
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
        const { firstName, lastName, email, id } = vals;
        return { firstName, lastName, email, id };
    }
});

const User = mongoose.model('GoogleUser', googleUserSchema, 'users');

export default User;
