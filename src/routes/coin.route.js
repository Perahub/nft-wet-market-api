import express from 'express'
import { totalSupply, mintCoin, accountBalance } from '../controllers/coin.controller';

const router = express.Router()

router.get('/supply/total', totalSupply);
router.post('/mint', mintCoin)
router.get('/balance/:address', accountBalance)

export default router;