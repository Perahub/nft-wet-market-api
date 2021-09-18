import {
    coinContract,
    minterAddress,
    DEFAULT_DECIMAL_PLACES
} from "../config"
import httpStatus from 'http-status-codes'



const totalSupply = async (req, res, next) => {
    try {
        const contract = await coinContract()
        const totalSupply = await contract.methods.totalSupply().call();
        res.json({
            totalSupply
        })
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }

}

const mintCoin = async (req, res, next) => {
    try {
        const contract = await coinContract()
        const coin = await contract.methods.mint(req.body.address, Number(req.body.amount)).send({
            from: minterAddress
        });
        return res.json({
            message: 'success'
        })
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const accountBalance = async (req, res, next) => {
    try {
        const contract = await coinContract()
        const balance = await contract.methods.balanceOf(req.params.address).call();
        return res.json({
            balance: balance
        })
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}

export {
    totalSupply,
    mintCoin,
    accountBalance
}