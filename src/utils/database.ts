import mongoose from "mongoose";
import { DATABASE } from "./constants";

const connectDB = (cb: () => void) => {
    console.log('connecting to DB...')
    mongoose.set('strictQuery', true);
    mongoose.connect(DATABASE.MONGO_URI)
    .then(connection => {
        console.log('connected to DB!')
        cb()
    }).catch(err => {
        console.log(err)
    })
}

export default connectDB;