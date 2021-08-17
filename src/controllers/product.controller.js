import {
    productContract
} from "../config"

const getProducts = async (req, res) => {
    res.json({
        message: 'hi'
    })
}

const getTotalSupply = async (req, res) => {
    const totalSupply = await productContract.methods.totalSupply().call();
    res.json({
        totalSupply
    })
}


export {
    getProducts,
    getTotalSupply
}