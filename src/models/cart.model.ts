import { model, Schema } from 'mongoose'

const cartSchema = new Schema({
    Item: [{
        item_qty: {
            type: Number,
            required: true
        },

        total_item_Price: {
            type: Number
        },

        product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
    }],

    cart_total_price: {
        type: Number
    },

    isRemove: {
        type: Boolean,
        default: false
    }


})

const Cart = model('cart', cartSchema)
export default Cart