import { Schema, model } from 'mongoose';

const packageSize = new Schema({
    size: {
        type: String,
        default: 'standard',
        required: true,
        trim: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        required: true
    }
});

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
    },
    attributes: {
        type: Map,
        of: Schema.Types.Mixed
    },
    inventory: {
        type: [packageSize],
        required: [true, 'Inventory is required']
    }
});

const Product = model('Product', productSchema);

export default Product;
