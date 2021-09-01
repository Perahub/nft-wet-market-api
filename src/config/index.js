import * as dotenv from "dotenv";
import Web3 from 'web3';
import mongoose from "mongoose";
import Product from '../abis/Product.json'

dotenv.config();

const PORT = process.env.PORT || 4001;
const db = mongoose.connection;

const modelOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}

const startApplication = (app) => {
    mongoose.connect(process.env.DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Listening on port ${PORT}`);
            });
        })
        .catch(error => {
            console.log(error)
        })

    db.once("open", () => {
        console.log('connected to database!');
    });
    db.on("error", console.error.bind(console, "connection error:"));
};

let USER = process.env.KALEIDO_USER || 'u0rkdjwlc3';
let PASS = process.env.KALEIDO_PASSWORD || "njnnv3bE2mRGLAa0UlT8ATlM4m9mDj3HN7_kSlL84CI";
let RPC_ENDPOINT = process.env.KALEIDO_RPC_ENDPOINT || "u0rkdjwlc3:njnnv3bE2mRGLAa0UlT8ATlM4m9mDj3HN7_kSlL84CI@u0dpdn3t1b-u0g4dqysq1-rpc.us0-aws.kaleido.io";
let nodeUrl = `https://${USER}":"${PASS}"@"${RPC_ENDPOINT}`;
const web3 = new Web3(Web3.providers.HttpProvider(nodeUrl));
const networkId = async () => web3.eth.net.getId();
const productNetworkData = async () => Product.networks[await networkId()]
const productContractAddress = async () => await productNetworkData.address;
const productContract = async () => new web3.eth.Contract(Product.abi, await productContractAddress());


export {
    web3,
    productContract,
    startApplication,
    modelOptions
}