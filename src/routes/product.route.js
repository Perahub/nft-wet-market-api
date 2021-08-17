import express from 'express'
import { getProducts, getTotalSupply } from '../controllers/product.controller'

const router = express.Router()

router.get('/', getProducts);
router.get('/supply/total', getTotalSupply);

export default router;