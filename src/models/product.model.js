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
        },
        unit: {
            type: String,
        },
        address: {
            type: String
        }
    },
    modelOptions
);

productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;