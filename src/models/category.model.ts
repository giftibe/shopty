import { model, Schema, } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    }
})
const Category = model('category', categorySchema)
export default Category
