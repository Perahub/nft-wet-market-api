import mongoose from "mongoose";
import {
    v4 as uuidv4
} from "uuid";
import {
    modelOptions
} from '../config/index'

const {
    Schema
} = mongoose;

const productSchema = new Schema({
        _id: {
            type: String,
            default: function () {
                return uuidv4();
            },
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
        },
        quantity: {
            type: Number,
        }
    },
    modelOptions
);

const Product = mongoose.model("Product", productSchema);

export default Product;