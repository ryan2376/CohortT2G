import express from 'express'
import { protect } from '../middlewares/auth/protect'
import { createBorrow, getAllActiveBorrows, getBorrowedBooks } from '../controllers/borrowController'




const router = express.Router()

// Route to create a new borrow record
router.post('/', protect, createBorrow);
router.get('/user/:userId', getBorrowedBooks);
router.get('/active', getAllActiveBorrows);

export default router