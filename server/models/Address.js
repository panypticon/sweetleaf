import { Schema } from 'mongoose';

const addressSchema = new Schema(
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
        street: {
            type: String,
            trim: true,
            maxlength: [256, 'Street address is too long']
        },
        city: {
            type: String,
            trim: true,
            maxlength: [128, 'City is too long']
        },
        zip: {
            type: String,
            trim: true,
            maxlength: [32, 'Zip code is too long']
        },
        country: {
            type: String,
            default: 'germany',
            trim: true,
            maxlength: [128, 'Country is too long']
        }
    },
    { _id: false }
);

export default addressSchema;
