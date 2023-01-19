import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    type: {
        type: String,
        enum: {
            values: ['tea', 'gear'],
            message: 'Invalid type'
        },
        required: [true, 'Type is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    }
});

const Product = model('Product', productSchema);

export default Product;
