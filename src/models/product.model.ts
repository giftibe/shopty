import { model, Schema, } from 'mongoose'

const productSchema = new Schema({
    product_name: {
        type: String,
        trim: true,
        maxLength: 20,
        minlength: 2
    },

    quantity: {
        type: Number,
        trim: true,
        required: true,
    },

    images: {
        type: String,
        // required:true,
        content: []
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
        type: String,
        required: true,
        lowercase: true
    },

    reviews: {
        type: String,
        minlength: 5,
        maxlength: 200
    }, 

    isDeleted: {
        type: Boolean,
        default: false
    },

})

const Product = model('product', productSchema)
export default Product