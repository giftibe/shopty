import { model, Schema, } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
    }
})

const Category = model('category', categorySchema)
export default Category