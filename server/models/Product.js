import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    type: {
        type: String,
        enum: [['tea', 'gear'], 'Type is invalid'],
        required: [true, 'Type is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    }
});

const Product = model('Product', productSchema);

export default Product;
