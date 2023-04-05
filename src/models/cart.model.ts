import { model, Schema } from 'mongoose'

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },

    cart_total_price: {
        total: Number
    },
})

const Cart = model('cart', cartSchema)
export default Cart