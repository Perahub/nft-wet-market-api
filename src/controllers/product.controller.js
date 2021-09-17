import ProductModel from '../models/product.model'
import httpStatus from 'http-status-codes'
import {
    minterAddress,
    productContract,
    web3
} from '../config';
import {
    create,
    deleteById,
    findById,
    get,
    updateById
} from '../repositories/product.repository';

const productURL = (id) => `${process.env.NODE_BASE_URL}/products/${id}`;

const createProduct = async (req, res) => {
    try {
        const product = await create(req, res)
        const productObject = product.toObject();
        const contract = await productContract();
        const block = await web3.eth.getBlock("latest");
        await contract.methods.addItem(
            req.body.address,
            productURL(productObject.id)
        ).send({
            from: minterAddress,
            gas: block.gasLimit
        })
        return res.status(httpStatus.CREATED).json({
            product
        })
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const getProduct = async (req, res, next) => {
    try {
        const product = await findById(req)
        const productObject = product.toObject();
        if (product) {
            res.json({
                ...productObject
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

const getProducts = async (req, res, next) => {
    try {
        const products = await get(req, res);
        res.json({
            ...products
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            message: error.message,
        });
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await updateById(req, res);
        if (product) {
            return res.json({
                product
            });
        }
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Not found!"
        })

    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            message: error.message,
        });
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const product = await deleteById(req, res);
        if (product) {
            return res.json({
                message: "ok"
            });
        }
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Not found!"
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            message: error.message,
        });
    }
}

const sendProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Not found!"
            });
        }

        product.address =  req.body.receiver_address;
        product.save();

        const contract = await productContract();
        const block = await web3.eth.getBlock("latest");
        await contract.methods.safeTransferFrom(
            req.body.sender_address,
            req.body.receiver_address,
            product.item_id
        ).send({
            from: req.body.sender_address,
            gas: block.gasLimit
        })
        return res.json({
            message: 'product sent'
        });

    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const accountBalance = async (req, res) => {
    try {
        const contract = await productContract();
        const balance = await contract.methods.balanceOf(
            req.params.address
        ).call();
        return res.json({
            data: Number(balance)
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}


export {
    createProduct,
    updateProduct,
    getProduct,
    getProducts,
    deleteProduct,
    sendProduct,
    accountBalance
}