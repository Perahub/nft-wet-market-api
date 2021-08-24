import UserModel from '../models/user.model'

const create = async (req, res) => {
    const user = await UserModel.create({
        ...req.body
    });
    return user;
}

const findById = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    return user;
}

const get = async (req, res) => {
    const users = await UserModel.paginate();
    return users;
}


const updateById = async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(
        req.params.id, {
            ...req.body,
        }, {
            new: true,
        }
    );
    return user;
}


const deleteById = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
        await user.remove()
        return user;
    }
    return null;
}

export {
    create,
    updateById,
    get,
    findById,
    deleteById
}