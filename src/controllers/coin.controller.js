import {
    coinContract,
    minterAddress
} from "../config"
import httpStatus from 'http-status-codes'



const totalSupply = async (req, res, next) => {
    const contract = await coinContract()
    const totalSupply = await contract.methods.totalSupply().call();
    res.json({
        totalSupply
    })
}

const mintCoin = async (req, res, next) => {
    try {
        const contract = await coinContract()
        const mint = await contract.methods.mint(req.body.address, Number(req.body.amount)).send({
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
            balance
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