import express from 'express'
import { totalSupply } from '../controllers/coin.controller';

const router = express.Router()

router.get('/supply/total', totalSupply);


export default router;