import { productContractAddress, web3 } from "../config";

const totalSupply = async (req, res, next) => {
    // const networkId = await web3.eth.net.getId();
    console.log(await productContractAddress())
}

export {
    totalSupply
}