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

const getHttpProvider = () => {
    if (process.env.NODE_ENV === 'production') {
        let USER = process.env.KALEIDO_USER || 'u0jgz0mxii';
        let PASS = process.env.KALEIDO_PASSWORD || "Fjoh2U7anVpNIZ-WtkqdD8OeFIsMZczaTBFLg7ec1k8";
        let RPC_ENDPOINT = process.env.KALEIDO_RPC_ENDPOINT || "u0hp7dw3b8-u0vcjk91r1-rpc.us0-aws.kaleido.io";
        return `https://${USER}":"${PASS}"@"${RPC_ENDPOINT}`;
    } else {
        return 'http://localhost:8545'
    }
}

const nodeUrl = getHttpProvider();
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