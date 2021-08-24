import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import {
    modelOptions
} from '../config/index'

const {
    Schema
} = mongoose;

const productSchema = new Schema({
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
        },
        item_id: {
            type: Number
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    modelOptions
);

productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;