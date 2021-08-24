import httpStatus from 'http-status-codes'
import {
    create,
    deleteById,
    findById,
    get,
    updateById
} from '../repositories/user.repository';

const createUser = async (req, res) => {
    try {
        const user = await create(req, res)
        return res.status(httpStatus.CREATED).json({
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await findById(req)
        const userObject = user.toObject();
        if (user) {
            res.json({
                ...userObject
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

const getUsers = async (req, res, next) => {
    try {
        const users = await get(req, res);
        res.json({
            ...users
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            message: error.message,
        });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await updateById(req, res);
        if (user) {
            return res.json({
                user
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

const deleteUser = async (req, res, next) => {
    try {
        const user = await deleteById(req, res);
        if (user) {
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

export {
    createUser,
    updateUser,
    getUser,
    getUsers,
    deleteUser
}