import * as dotenv from "dotenv";
import Web3 from 'web3';
import Product from '../abis/Product.json'

dotenv.config();

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const productNetworkId = async () => web3.eth.net.getId();
const productContract = async () => {
    const networkId = await productNetworkId();
    const productNetworkData = await Product.networks[networkId]
    const productContractAddress = productNetworkData.address;
    const contract = new web3.eth.Contract(Product.abi, productContractAddress);
    return contract;
}

export {
    web3,
    productContract
}