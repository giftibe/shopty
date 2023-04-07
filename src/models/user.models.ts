import { Schema, model } from 'mongoose';
import { ENUM } from '../configs/constant.configs'
import UserModel from '../interfaces/user.interfaces';
import IUser from '../interfaces/user.interfaces';
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        upperCase: true,
        trim: true,
    },

    fullname: {
        type: String,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    role: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        title: [ENUM.ADMIN, ENUM.SELLER, ENUM.BUYER],
        default: ENUM.BUYER,
    },

    avatarURL: {
        type: String
    },

    imageTag: {
        type: String
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })


// userSchema.plugin(passportLocalMongoose);
const User = model('user', userSchema);
export default User