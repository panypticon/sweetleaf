import { Schema, model } from 'mongoose';

import addressSchema from './Address.js';

const itemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        amount: {
            type: Number,
            min: 1,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    { _id: false }
);

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        shippingAddress: {
            type: addressSchema,
            required: true,
            default: undefined
        },
        items: {
            type: [itemSchema],
            required: true,
            default: undefined
        },
        totalPrice: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

orderSchema.set('toJSON', {
    virtuals: true,
    transform: (_, vals) => {
        const { id, user, shippingAddress, items, createdAt, totalPrice } = vals;
        return { id, user, shippingAddress, items, createdAt, totalPrice };
    }
});

const Order = model('Order', orderSchema);

export default Order;
