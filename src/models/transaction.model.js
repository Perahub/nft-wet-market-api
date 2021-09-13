import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import {
    modelOptions
} from '../config/index'

const {
    Schema
} = mongoose;

const transactionSchema = new Schema({
        sender: {
            type: String,
        },
        receiver: {
            type: String,
        },
        unit_price: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        unit: {
            type: String,
        },
        decription: {
            type: String
        },
        item_id: {
            type: Number
        }
    },
    modelOptions
);

transactionSchema.plugin(mongoosePaginate);
const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;