import { model, Schema, } from 'mongoose'
const productSchema = new Schema({
    product_name: {
        type: String,
        trim: true,
        maxLength: 20,
        minlength: 2,
        lowercase: true,
        required: true
    },

    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    quantity: {
        type: Number,
        trim: true,
        required: true,
    },

    images: {
        type: String,
        // required:true,
        content: [""]
    },

    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 300
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

})

const Product = model('product', productSchema)
export default Product