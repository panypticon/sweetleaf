import { Schema, model } from 'mongoose';

const categories = {
    tea: ['green', 'black', 'white', 'oolong', 'herbal'],
    gear: []
};

const attributes = {
    tea: {
        origin: ['china', 'japan', 'korea', 'darjeeling'],
        flavored: [true, false],
        taste: ['aromatic', 'astringent', 'flowery', 'fresh', 'fragrant', 'fruity', 'light', 'jasmine']
    },
    gear: {}
};

const packageSize = new Schema(
    {
        size: {
            type: String,
            trim: true,
            default: 'standard'
        },
        price: {
            type: Number,
            min: 0,
            required: [true, 'Price is required']
        },
        amount: {
            type: Number,
            min: 0,
            required: [true, 'Amount is required']
        }
    },
    { _id: false }
);

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Label is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true
        },
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
            trim: true,
            validate: {
                validator: function (cat) {
                    return categories[this.type].includes(cat);
                },
                message: 'Invalid category'
            }
        },
        attributes: {
            type: Map,
            of: Schema.Types.Mixed,
            validate: {
                validator: async function (attrs) {
                    let _this = this;
                    console.log(this.constructor.name);
                    if (this.constructor.name === 'Query') {
                        const id = this.getQuery()._id.toString();
                        _this = await Product.findById(id);
                    }
                    for (const [key, value] of attrs) {
                        if (Array.isArray(value)) {
                            const allIncluded = value.every(item => attributes[_this.type][key].includes(item));
                            if (!allIncluded) return false;
                        } else {
                            if (!attributes[_this.type][key].includes(value)) return false;
                        }
                    }
                    return true;
                },
                message: 'Invalid attributes'
            }
        },
        inventory: {
            type: [packageSize],
            default: undefined,
            required: [true, 'Inventory is required']
        }
    },
    { timestamps: true }
);

productSchema.virtual('image').get(function () {
    return `assets/${this.id}.jpeg`;
});

productSchema.set('toJSON', {
    virtuals: true,
    transform: (_, vals) => {
        const { id, name, type, category, attributes, inventory, image } = vals;
        return { id, name, type, category, attributes, inventory, image };
    }
});

const Product = model('Product', productSchema);

export default Product;
