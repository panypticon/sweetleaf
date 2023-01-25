import { Schema, model } from 'mongoose';

const ratingSchema = new Schema(
    {
        rating: {
            type: Number,
            min: [0, 'Rating must be between 0 and 5'],
            max: [5, 'Rating must be between 0 and 5'],
            required: [true, 'Rating is required'],
            validate: { validator: val => Number.isInteger(val / 0.5), message: 'Rating must be in increments of 0.5' }
        },
        comment: {
            type: String,
            trim: true,
            maxLength: [512, 'Comment must be 512 characters or less'],
            default: null
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required']
        }
    },
    { timestamps: true }
);

ratingSchema.set('toJSON', {
    virtuals: true,
    transform: (_, vals) => {
        const { id, user, rating, comment, product, createdAt } = vals;
        return { id, user, rating, comment, product, createdAt };
    }
});

const Rating = model('Rating', ratingSchema);

export default Rating;
