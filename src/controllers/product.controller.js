import {
    productContract
} from "../config"

const getProducts = async (req, res) => {
    res.json({
        message: 'hi'
    })
}

const getTotalSupply = async (req, res) => {
    const contract = await productContract();
    const totalSupply = await contract.methods.totalSupply().call();
    res.json({
        totalSupply
    })
}


export {
    getProducts,
    getTotalSupply
}