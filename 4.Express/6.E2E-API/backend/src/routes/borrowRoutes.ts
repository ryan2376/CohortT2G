import express from 'express'
import { protect } from '../middlewares/auth/protect'
import { createBorrow } from '../controllers/borrowController'




const router = express.Router()

// Route to create a new borrow record
router.post('/', protect, createBorrow);

export default router