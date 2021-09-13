import TransactionModel from '../models/transaction.model'
import httpStatus from 'http-status-codes'
// import {
//     productContract
// } from '../config';
import {
    create,
    findById,
    get
} from '../repositories/transaction.repository';

const transactionURL = (id) => `${process.env.NODE_BASE_URL}/transactions/${id}`;

const createTransaction = async (req, res) => {
    try {
        const transaction = await create(req, res)
        const transactionObject = transaction.toObject();
        // const contract = await productContract();
        // await contract.methods.addItem(
        //     req.body.address,
        //     transactionURL(transactionObject._id)
        // ).encodeABI();
        return res.status(httpStatus.CREATED).json({
            transaction
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const getTransaction = async (req, res, next) => {
    try {
        const transaction = await findById(req)
        const transactionObject = transaction.toObject();
        if (transaction) {
            res.json({
                ...transactionObject
            });
        } else {
            res.status(httpStatus.NOT_FOUND).json({
                message: "Not found",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).json({
            message: error.message,
        });
    }
};

const getTransactions = async (req, res, next) => {
    try {
        const transactions = await get(req, res);
        res.json({
            ...transactions
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            message: error.message,
        });
    }
};

export {
    createProduct,
    getProduct,
    getProducts
}