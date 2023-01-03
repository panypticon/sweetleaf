import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const userSchema = new mongoose.Schema(
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
            unique: [true, 'Email address already taken'],
            trim: true,
            validate: {
                validator: val => isEmail(val),
                message: 'Email address is invalid'
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
