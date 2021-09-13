import TransactionModel from '../models/transaction.model'

const create = async (req, res) => {
    const transactionCount = await totalTransactions()
    const transaction = await TransactionModel.create({
        ...req.body,
        item_id: transactionCount + 1
    });
    return transaction;
}

const findById = async (req, res) => {
    const transaction = await TransactionModel.findById(req.params.id);
    return transaction;
}

const get = async (req, res) => {
    const transactions = await TransactionModel.paginate();
    return transactions;
}

const totalTransactions = async () => {
    return await TransactionModel.countDocuments({})
}

// const send = async (req, res) => {
//     const transaction = await findById(req)
// }

export {
    create,
    get,
    findById
}