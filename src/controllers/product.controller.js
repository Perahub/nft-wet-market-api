import ProductModel from '../models/product.model'
import httpStatus from 'http-status-codes'

const createProduct = async (req, res) => {
    try {
        const product = await ProductModel.create({
            ...req.body
        });
        return res.status(httpStatus.CREATED).json({
            ...product
        })
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const getProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (product) {
            res.json({
                ...product
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
        const products = await ProductModel.paginate();
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
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id, {
                ...req.body,
            }, {
                new: true,
            }
        );
        res.json({
            ...product
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            error: error.message,
        });
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        await product.remove()
        res.json({
            message: "ok"
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            error: error.message,
        });
    }
}

// const mintProduct = async (req, res) => {
//     try {
//         const contract = await productContract();
//         await contract.methods.mint(req.body.name).encodeABI();
//         return res.json({
//             message: 'successfully minted!'
//         });
//         // return
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         })
//     }
// }


export {
    createProduct,
    updateProduct,
    getProduct,
    getProducts,
    deleteProduct
}