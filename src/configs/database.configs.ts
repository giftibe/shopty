import mongoose from 'mongoose'
import { MESSAGES } from './constant.configs'

function database() {
    mongoose
        .set('strictQuery', true)
        .connect(process.env.DATABASE_URI!, {
        })
        .then(() => {
            console.log(MESSAGES.DATABASE.CONNECTED);
        })
        .catch((err) => {
            console.log(MESSAGES.DATABASE.ERROR + err);
        })

}

export default database;
