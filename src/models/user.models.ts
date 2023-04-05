import { Schema, model } from 'mongoose';
import passLocalMongoose from "passport-local-mongoose";
import { ENUM } from '../configs/constant.configs'
import passport from 'passport';
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 15,
        minlenght: 4
    },

    fullName: {
        type: String,
        minlength: 4,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
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

userSchema.plugin(passLocalMongoose)
const User = model('user', userSchema);
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



export default User