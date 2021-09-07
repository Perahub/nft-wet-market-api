import { coinContract } from "../config"


const totalSupply = async (req, res, next) => {
    const contract = await coinContract()
    const totalSupply = await contract.methods.totalSupply().call();
    res.json({
        totalSupply
    })
}

export {
    totalSupply
}