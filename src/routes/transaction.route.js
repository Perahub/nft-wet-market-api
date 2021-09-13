import express from 'express'
import { createTransaction, getTransaction, getTransactions } from '../controllers/transaction.controller'

const router = express.Router()

router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.post('/', createTransaction);

export default router;