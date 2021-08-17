import express from 'express'
import { getProducts, getTotalSupply, mintProduct } from '../controllers/product.controller'

const router = express.Router()

router.get('/', getProducts);
router.get('/supply/total', getTotalSupply);
router.post('/mint', mintProduct);

export default router;