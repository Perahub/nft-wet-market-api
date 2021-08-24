import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import {
    modelOptions
} from '../config/index'

const {
    Schema
} = mongoose;

const userSchema = new Schema({
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        image: {
            type: String,
        },
        email_address: {
            type: String,
        },
        wallet_address: {
            type: String,
        },
        products: [{
            type: String,
            ref: 'Product'
        }]
    },
    modelOptions
);

userSchema.plugin(mongoosePaginate);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;