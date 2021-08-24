import ProductModel from '../models/product.model'
import httpStatus from 'http-status-codes'
import {
    productContract
} from '../config';
import {
    create,
    deleteById,
    get,
    totalProducts,
    updateById
} from '../repositories/product.repository';

const productURL = (id) => `${process.env.NODE_BASE_URL}/products/${id}`;

const createProduct = async (req, res) => {
    try {
        const product = await create(req, res)
        // const productObject = product.toObject();
        // const contract = await productContract();
        // await contract.methods.addItem(
        //     req.body.address,
        //     productURL(productObject._id)
        // ).encodeABI();
        return res.status(httpStatus.CREATED).json({
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const getProduct = async (req, res, next) => {
    try {
        // const product = await ProductModel.findById(req.params.id);
        const product = await findByIdAndUpdate(req.params.id)
        const productObject = product.toObject();
        if (product) {
            res.json({
                ...productObject
            });
        } else {
            res.status(httpStatus.NOT_FOUND).json({
                error: "Not found",
            });
        }
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            error: error.message,
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
            error: error.message,
        });
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await updateById(req, res);
        res.json({
            product
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            error: error.message,
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
            error: error.message,
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

        const contract = await productContract();
        await contract.methods.transferFrom(
            req.body.sender_address,
            req.body.receiver_address,
            req.params.id
        ).encodeABI();
        return res.json({
            message: 'product sent'
        });
        // return
    } catch (error) {
        return res.status(400).json({
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
    sendProduct
}