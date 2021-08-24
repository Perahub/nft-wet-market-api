import ProductModel from '../models/product.model'

const create = async (req, res) => {
    const productCount = await totalProducts()
    const product = await ProductModel.create({
        ...req.body,
        item_id: productCount + 1
    });
    return product;
}

const findById = async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    return product;
}

const get = async (req, res) => {
    const products = await ProductModel.paginate();
    return products;
}


const updateById = async (req, res) => {
    const product = await ProductModel.findByIdAndUpdate(
        req.params.id, {
            ...req.body,
        }, {
            new: true,
        }
    );
    return product;
}


const deleteById = async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
        await product.remove()
        return product;
    }
    return null;
}

const totalProducts = async () => {
    return await ProductModel.countDocuments({})
}

const send = async (req, res) => {
    const product = await findById(req)
}

export {
    create,
    updateById,
    get,
    findById,
    deleteById
}