import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            maxlength: [128, 'First name is too long']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            maxlength: [128, 'Last name is too long']
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique: [true, 'Email address already taken'],
            trim: true,
            validate: {
                validator: val => isEmail(val),
                message: 'Email address is invalid'
            },
            maxlength: [256, 'Email is too long']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
            match: [
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                'Password must be 8+ characters long and must include upper- and lower-case letters, numbers, and special characters'
            ]
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
