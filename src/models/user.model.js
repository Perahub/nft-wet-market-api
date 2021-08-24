import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import {
    v4 as uuidv4
} from "uuid";
import {
    modelOptions
} from '../config/index'

const {
    Schema
} = mongoose;

const userSchema = new Schema({
        _id: {
            type: String,
            default: function () {
                return uuidv4();
            },
        },
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
            type: Number,
        }
    },
    modelOptions
);

userSchema.plugin(mongoosePaginate);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;