import * as dotenv from "dotenv";
import Web3 from 'web3';

dotenv.config();

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const Product = artifacts.require("Product");
const productNetworkId = async () => await web3.eth.net.getId()
const productNetworkData = Product.networks(productNetworkId);
const productContractAddress = productNetworkData.address;
const productContract = new web3.eth.Contract(Product.abi, productContractAddress);

export {
    web3,
    productContract,
    productNetworkData
}