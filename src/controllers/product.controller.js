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

const getBalances = async (req, res) => {
    const contract = await productContract();
    const balance = await contract.methods.getBalances().call();
    res.json({
        balance
    })
}

const mintProduct = async (req, res) => {
    try {
        const contract = await productContract();
        await contract.methods.mint(req.body.name).encodeABI();
        return res.json({
            message: 'successfully minted!'
        });
        // return
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export {
    getProducts,
    getTotalSupply,
    mintProduct,
    getBalances
}