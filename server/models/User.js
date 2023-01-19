import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import { hash, compare } from 'bcrypt';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

const sign = promisify(jwt.sign);

const userSchema = new Schema(
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
        }
    },
    { timestamps: true }
);

//// Hooks
// Save: Encrypt password and set default role to 'user'
userSchema.pre('save', async function (next) {
    this.password = await hash(this.password, 12);
    if (this.isNew) this.role = 'user';
    next();
});
// Update: Encrypt password, if a new one is set, and make sure user roles can't be escalated
userSchema.pre('findOneAndUpdate', async function (next) {
    if (this._update.password) this._update.password = await hash(this._update.password, 12);
    delete this._update.role;
    next();
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
        const { firstName, lastName, email, id } = vals;
        return { firstName, lastName, email, id };
    }
});

const User = model('User', userSchema, 'users');

export default User;
