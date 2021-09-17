import express from 'express'
import { accountBalance, createProduct, deleteProduct, getProduct, getProducts, sendProduct, updateProduct } from '../controllers/product.controller'

const router = express.Router()

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.put('/:id/send', sendProduct);
router.get('/balance/:address', accountBalance);
// router.get('/supply/total', getTotalSupply);
// router.post('/mint', mintProduct);

export default router;